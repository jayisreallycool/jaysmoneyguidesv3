'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  deleteUser as fbDeleteUser,
  reauthenticateWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  type Auth,
  type User as FirebaseUser,
} from 'firebase/auth';

/*
|--------------------------------------------------------------------------
| Firebase client configuration
|--------------------------------------------------------------------------
*/

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'jaysmoneyguides.firebaseapp.com',

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    'jaysmoneyguides',

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'jaysmoneyguides.firebasestorage.app',

  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;

/*
|--------------------------------------------------------------------------
| Firebase app
|--------------------------------------------------------------------------
*/

function getClientApp(): FirebaseApp | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!config.apiKey) {
    console.error(
      'Firebase client is not configured: NEXT_PUBLIC_FIREBASE_API_KEY is missing.'
    );

    return null;
  }

  try {
    if (getApps().length > 0) {
      return getApps()[0];
    }

    app = initializeApp(config);

    // App Check is optional. If Firebase Authentication App Check enforcement
    // is enabled, provide NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY in Vercel.
    // Never initialize it with an empty/invalid key because that can produce
    // auth/firebase-app-check-token-is-invalid.
    const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY;
    if (appCheckSiteKey) {
      try {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(appCheckSiteKey),
          isTokenAutoRefreshEnabled: true,
        });
      } catch (error) {
        console.error('Firebase App Check initialization failed:', error);
      }
    }

    return app;
  } catch (error) {
    console.error('Firebase initialization failed:', error);

    return null;
  }
}

/*
|--------------------------------------------------------------------------
| Firebase Storage
|--------------------------------------------------------------------------
*/

export function getFirebaseStorage(): FirebaseStorage | null {
  const firebaseApp = getClientApp();

  if (!firebaseApp) {
    return null;
  }

  try {
    return getStorage(firebaseApp);
  } catch (error) {
    console.error('Firebase Storage initialization failed:', error);

    return null;
  }
}

/*
|--------------------------------------------------------------------------
| Firebase Auth
|--------------------------------------------------------------------------
*/

export function getFirebaseAuth(): Auth | null {
  const firebaseApp = getClientApp();

  if (!firebaseApp) {
    return null;
  }

  try {
    return getAuth(firebaseApp);
  } catch (error) {
    console.error('Firebase Auth initialization failed:', error);

    return null;
  }
}

/*
|--------------------------------------------------------------------------
| Auth configuration check
|--------------------------------------------------------------------------
*/

export function isAuthConfigured(): boolean {
  return Boolean(
    config.apiKey &&
      config.authDomain &&
      config.projectId &&
      config.appId
  );
}

/*
|--------------------------------------------------------------------------
| Auth result type
|--------------------------------------------------------------------------
*/

export type AuthResult =
  | {
      ok: true;
      user: FirebaseUser;
    }
  | {
      ok: false;
      error: string;
    };

/*
|--------------------------------------------------------------------------
| Firebase error helper
|--------------------------------------------------------------------------
*/

function getFirebaseError(error: unknown): {
  code: string;
  message: string;
} {
  const firebaseError = error as {
    code?: string;
    message?: string;
  };

  return {
    code:
      typeof firebaseError?.code === 'string'
        ? firebaseError.code
        : 'unknown',

    message:
      typeof firebaseError?.message === 'string'
        ? firebaseError.message
        : 'Unknown Firebase authentication error.',
  };
}

/*
|--------------------------------------------------------------------------
| Friendly error messages
|--------------------------------------------------------------------------
*/

/**
 * What the visitor is told. Plain language, always with a way forward.
 * The technical cause (and how the site owner fixes it) goes to the browser
 * console via ownerHint() — visitors can't act on it.
 */
const VISITOR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'That email address doesn\'t look right. Please check it.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password. If you signed up with Google, use "Continue with Google" instead.',
  'auth/invalid-login-credentials': 'Incorrect email or password. If you signed up with Google, use "Continue with Google" instead.',
  'auth/user-disabled': 'This account has been disabled. Please contact us.',
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/weak-password': 'Please choose a password with at least 6 characters.',
  'auth/missing-password': 'Please enter your password.',
  'auth/missing-email': 'Please enter your email address.',
  'auth/popup-blocked': 'Your browser blocked the Google window. Allow pop-ups for this site, then tap "Continue with Google" again.',
  'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'auth/network-request-failed': 'We couldn\'t reach the sign-in service. Check your connection and try again.',
  'auth/timeout': 'Sign-in took too long. Please try again.',
  'auth/web-storage-unsupported': 'Your browser is blocking the storage sign-in needs. Turn off private browsing or allow cookies for this site, then try again.',
  'auth/operation-not-supported-in-this-environment': 'Google sign-in doesn\'t work in this browser. Open the page in Safari or Chrome, or use email and password.',
  'auth/account-exists-with-different-credential': 'You already have an account with this email. Sign in with your email and password instead.',
  'auth/requires-recent-login': 'For your security, please sign in again and then retry.',
  'auth/user-token-expired': 'Your session expired. Please sign in again.',
};

/** Setup problems only the site owner can fix — the visitor gets a generic line. */
const OWNER_HINTS: Record<string, string> = {
  'auth/unauthorized-domain':
    'Add this exact domain under Firebase console → Authentication → Settings → Authorized domains (add both jaysmoneyguides.com and www.jaysmoneyguides.com).',
  'auth/operation-not-allowed':
    'This sign-in method is switched off. Firebase console → Authentication → Sign-in method → enable Google and Email/Password.',
  'auth/invalid-api-key':
    'NEXT_PUBLIC_FIREBASE_API_KEY in Vercel is wrong or missing. Copy it from Firebase console → Project settings → Your apps, then redeploy.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    'NEXT_PUBLIC_FIREBASE_API_KEY in Vercel is wrong. Copy it from Firebase console → Project settings → Your apps, then redeploy.',
  'auth/app-not-authorized':
    'The API key is restricted. Google Cloud console → Credentials → the Browser key → allow this website and the Identity Toolkit API.',
  'auth/configuration-not-found':
    'Firebase Authentication has not been set up for this project. Firebase console → Authentication → Get started.',
  'auth/firebase-app-check-token-is-invalid':
    'App Check is enforced for Authentication. Set NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY in Vercel, or turn enforcement off in Firebase console → App Check.',
  'auth/internal-error':
    'Firebase returned an internal error. Common causes: the Google provider needs a support email (Authentication → Sign-in method → Google), the OAuth client was deleted, or the API key is restricted.',
  'auth/admin-restricted-operation':
    'New sign-ups are disabled. Firebase console → Authentication → Settings → User actions → enable create (sign-up).',
};

function ownerHint(code: string, message: string): string {
  const raw = `${code} ${message}`.toLowerCase();
  if (raw.includes('deleted_client') || raw.includes('deleted client')) {
    return 'The Google OAuth client was deleted. Firebase console → Authentication → Sign-in method: disable Google, save, then enable it again.';
  }
  if (raw.includes('requests-from-referer') || raw.includes('referer') && raw.includes('blocked')) {
    return 'The API key blocks this website. Google Cloud console → Credentials → the Browser key → add https://www.jaysmoneyguides.com/* and https://jaysmoneyguides.com/* to the allowed websites.';
  }
  if (raw.includes('billing') || raw.includes('quota')) {
    return 'Firebase reports a billing or quota problem on the project. Check Usage and billing in the Firebase console.';
  }
  return OWNER_HINTS[code] || '';
}

function friendlyError(error: unknown, method: 'google' | 'email' = 'email'): string {
  const { code, message } = getFirebaseError(error);

  const visitor = VISITOR_MESSAGES[code];
  if (visitor) return visitor;

  // A setup problem, or something unexpected. Tell the owner how to fix it
  // (console), and give the visitor another way in.
  const hint = ownerHint(code, message);
  console.error(`[auth] ${code}: ${message}${hint ? `\n  How to fix: ${hint}` : ''}`);

  return method === 'google'
    ? `Google sign-in isn't available right now. Please use email and password below. (${code})`
    : `Sign-in isn't available right now. Please try again in a few minutes. (${code})`;
}

/** The visitor closed or abandoned the Google window — not an error worth showing. */
function isCancelled(code: string): boolean {
  return (
    code === 'auth/popup-closed-by-user' ||
    code === 'auth/cancelled-popup-request' ||
    code === 'auth/popup-operation-cancelled' ||
    code === 'auth/user-cancelled'
  );
}

/*
|--------------------------------------------------------------------------
| In-app browsers
|--------------------------------------------------------------------------
| Google refuses to sign people in inside the browsers built into apps
| (TikTok, Instagram, Facebook…) — it shows "Error 403: disallowed_useragent".
| Nothing on our side can change that, so we detect it and say what to do.
*/

export function inAppBrowserName(): string {
  if (typeof navigator === 'undefined') return '';
  const ua = navigator.userAgent || '';
  if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return 'TikTok';
  if (/Instagram/i.test(ua)) return 'Instagram';
  if (/FBAN|FBAV|FB_IAB|FBIOS/i.test(ua)) return 'Facebook';
  if (/Snapchat/i.test(ua)) return 'Snapchat';
  if (/LinkedInApp/i.test(ua)) return 'LinkedIn';
  if (/Pinterest/i.test(ua)) return 'Pinterest';
  if (/\bLine\//i.test(ua)) return 'Line';
  if (/Twitter/i.test(ua)) return 'X';
  if (/; wv\)/.test(ua)) return 'this app';
  return '';
}

export const CANCELLED = '';

/*
|--------------------------------------------------------------------------
| Google Sign-In
|--------------------------------------------------------------------------
*/

export async function signInWithGoogle(): Promise<AuthResult> {
  const inApp = inAppBrowserName();
  if (inApp) {
    return {
      ok: false,
      error: `Google doesn't allow sign-in inside ${inApp === 'this app' ? 'an app' : `the ${inApp} app`}. Open this page in Safari or Chrome, or use email and password.`,
    };
  }

  const auth = getFirebaseAuth();

  if (!auth) {
    console.error('[auth] Firebase is not configured. Set the NEXT_PUBLIC_FIREBASE_* variables in Vercel and redeploy.');
    return {
      ok: false,
      error: 'Sign-in isn\'t available right now. Please try again later.',
    };
  }

  try {
    const provider = new GoogleAuthProvider();
    // Always let the visitor pick the account — avoids being silently signed
    // in to the wrong Google account on a shared device.
    provider.setCustomParameters({ prompt: 'select_account' });

    // Must run directly inside the click: no await before this line, or
    // Safari and Firefox block the window.
    const credential = await signInWithPopup(auth, provider);

    if (!credential.user) {
      return { ok: false, error: 'Google sign-in did not finish. Please try again.' };
    }

    return { ok: true, user: credential.user };
  } catch (error) {
    const { code } = getFirebaseError(error);

    // Closing the Google window is a choice, not a failure.
    if (isCancelled(code)) return { ok: false, error: CANCELLED };

    /*
     * No automatic switch to the full-page redirect flow here. With the
     * sign-in helper on a different domain (…firebaseapp.com), browsers
     * that block third-party storage (Safari, Firefox, Chrome) return from
     * that redirect signed OUT with no error — the visitor just lands back
     * on the page and nothing has happened.
     */
    return { ok: false, error: friendlyError(error, 'google') };
  }
}

/*
|--------------------------------------------------------------------------
| Email / Password Sign-In
|--------------------------------------------------------------------------
*/

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const auth = getFirebaseAuth();

  if (!auth) {
    return {
      ok: false,
      error: 'Sign-in isn\'t available right now. Please try again later.',
    };
  }

  try {
    const credential =
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    return {
      ok: true,
      user: credential.user,
    };
  } catch (error) {
    console.error('EMAIL SIGN-IN ERROR:', error);

    return {
      ok: false,
      error: friendlyError(error),
    };
  }
}

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export async function registerWithEmail(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const auth = getFirebaseAuth();

  if (!auth) {
    return {
      ok: false,
      error: 'Sign-in isn\'t available right now. Please try again later.',
    };
  }

  try {
    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    if (name.trim()) {
      // The account already exists at this point — a failed name update
      // must not be reported as a failed sign-up.
      try {
        await updateProfile(credential.user, { displayName: name.trim() });
      } catch (profileError) {
        console.warn('[auth] could not save display name:', profileError);
      }
    }

    return {
      ok: true,
      user: credential.user,
    };
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    return {
      ok: false,
      error: friendlyError(error),
    };
  }
}

/*
|--------------------------------------------------------------------------
| Password Reset
|--------------------------------------------------------------------------
*/

export async function sendReset(
  email: string
): Promise<{
  ok: boolean;
  error?: string;
}> {
  const auth = getFirebaseAuth();

  if (!auth) {
    return {
      ok: false,
      error: 'Sign-in isn\'t available right now. Please try again later.',
    };
  }

  try {
    await sendPasswordResetEmail(
      auth,
      email.trim()
    );

    return {
      ok: true,
    };
  } catch (error) {
    console.error('PASSWORD RESET ERROR:', error);

    return {
      ok: false,
      error: friendlyError(error),
    };
  }
}

/*
|--------------------------------------------------------------------------
| Sign Out
|--------------------------------------------------------------------------
*/

export async function signOutUser(): Promise<{ ok: boolean; error?: string }> {
  const auth = getFirebaseAuth();

  if (!auth) {
    return { ok: true }; // nothing to sign out of
  }

  try {
    await fbSignOut(auth);
    return { ok: true };
  } catch (error) {
    console.error('SIGN OUT ERROR:', error);
    return { ok: false, error: 'Could not sign out. Please try again.' };
  }
}

/*
|--------------------------------------------------------------------------
| Delete Account
|--------------------------------------------------------------------------
*/

export async function deleteAccount(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const auth = getFirebaseAuth();
  const user = auth?.currentUser;

  if (!auth || !user) {
    return {
      ok: false,
      error: 'You are not signed in.',
    };
  }

  try {
    /*
     * Google users need recent authentication before
     * Firebase allows sensitive account operations.
     */
    if (
      user.providerData.some(
        (provider) =>
          provider.providerId === 'google.com'
      )
    ) {
      const provider =
        new GoogleAuthProvider();

      await reauthenticateWithPopup(
        user,
        provider
      );
    }

    await fbDeleteUser(user);

    return {
      ok: true,
    };
  } catch (error) {
    console.error('DELETE ACCOUNT ERROR:', error);

    return {
      ok: false,
      error: friendlyError(error),
    };
  }
}

/*
|--------------------------------------------------------------------------
| Auth State Listener
|--------------------------------------------------------------------------
*/

export function watchAuth(
  cb: (user: FirebaseUser | null) => void
): () => void {
  const auth = getFirebaseAuth();

  if (!auth) {
    cb(null);
    return () => {};
  }

  return onAuthStateChanged(
    auth,
    cb
  );
}
