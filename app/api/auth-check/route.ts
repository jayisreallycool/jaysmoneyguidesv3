/**
 * GET /api/auth-check
 *
 * Plain yes/no answers about the sign-in setup, for the site owner to open in
 * a browser when Google sign-in fails. It asks Firebase the same questions the
 * sign-in button does and reports where it breaks. Nothing secret is shown:
 * no keys, tokens or user data — only public settings and status codes.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (v?: string) => (v || '').trim().replace(/^["']|["']$/g, '');
const host = (v?: string) => clean(v).replace(/^https?:\/\//i, '').replace(/\/.*$/, '');

async function get(url: string, init?: RequestInit): Promise<{ status: number; body: string }> {
  try {
    const res = await fetch(url, { ...init, cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(8000) });
    return { status: res.status, body: (await res.text()).slice(0, 4000) };
  } catch (err) {
    return { status: 0, body: err instanceof Error ? err.message : 'request failed' };
  }
}

function apiError(body: string): string {
  try {
    const e = JSON.parse(body)?.error;
    return [e?.status, e?.message].filter(Boolean).join(': ').slice(0, 300);
  } catch {
    return '';
  }
}

export async function GET(req: Request) {
  const site = new URL(req.url).host;
  const referer = `https://${site}/`;
  const apiKey = clean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  const rawAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const authDomain = host(rawAuthDomain) || 'jaysmoneyguides.firebaseapp.com';
  const appCheckKeySet = Boolean(clean(process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY));
  const problems: string[] = [];

  const settings = {
    apiKeySet: Boolean(apiKey),
    appIdSet: Boolean(clean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID)),
    appCheckKeySet: Boolean(clean(process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY)),
    projectId: clean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) || 'jaysmoneyguides (default)',
    authDomain,
    authDomainAsTypedInVercel: rawAuthDomain ?? '(not set — using default)',
  };

  if (!apiKey) problems.push('NEXT_PUBLIC_FIREBASE_API_KEY is not set in Vercel.');
  if (rawAuthDomain && clean(rawAuthDomain) !== authDomain) {
    problems.push(`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN in Vercel should be just "${authDomain}" (no https://, no slash, no quotes).`);
  }
  if (!/\.(firebaseapp\.com|web\.app)$/.test(authDomain) && authDomain !== site) {
    problems.push(`authDomain is "${authDomain}". Unless you set up a custom sign-in domain on purpose, it should be jaysmoneyguides.firebaseapp.com.`);
  }

  // 1. The sign-in helper pages Firebase hosts on the auth domain.
  const [iframe, handler, init] = await Promise.all([
    get(`https://${authDomain}/__/auth/iframe`),
    get(`https://${authDomain}/__/auth/handler`),
    get(`https://${authDomain}/__/firebase/init.json`),
  ]);
  const helper = { iframe: iframe.status, handler: handler.status, initJson: init.status };
  if (iframe.status !== 200 || handler.status !== 200) {
    problems.push(
      `The Google sign-in helper at https://${authDomain}/__/auth/ is not loading (status ${iframe.status}/${handler.status}). ` +
      (iframe.status === 402 || iframe.status === 403
        ? 'Firebase is refusing to serve it — this is what an unpaid or disabled billing account looks like.'
        : iframe.status === 404
          ? 'Nothing is hosted there: the auth domain is wrong, or Firebase Hosting was removed from the project.'
          : 'The auth domain is wrong or unreachable.')
    );
  }
  let keyMatchesProject: boolean | null = null;
  if (init.status === 200 && apiKey) {
    try {
      const cfg = JSON.parse(init.body);
      keyMatchesProject = cfg.apiKey === apiKey;
      if (!keyMatchesProject) problems.push('The API key in Vercel is not the one this Firebase project uses. Copy apiKey from Firebase console → Project settings → Your apps.');
    } catch { /* not JSON */ }
  }

  // 2. What Firebase Authentication says about this project and this website.
  let project: Record<string, unknown> = { skipped: 'no API key' };
  let googleProvider: Record<string, unknown> = { skipped: 'no API key' };
  if (apiKey) {
    const headers = { Referer: referer, Origin: `https://${site}` };
    const p = await get(`https://identitytoolkit.googleapis.com/v1/projects?key=${apiKey}`, { headers });
    let domains: string[] = [];
    try { domains = JSON.parse(p.body)?.authorizedDomains ?? []; } catch { /* error body */ }
    project = { status: p.status, error: p.status === 200 ? '' : apiError(p.body), authorizedDomains: domains, thisSiteAuthorized: domains.includes(site) };
    if (p.status !== 200) {
      problems.push(`Firebase Authentication rejected the request (${p.status}${apiError(p.body) ? ` — ${apiError(p.body)}` : ''}).`);
    } else if (!domains.includes(site)) {
      problems.push(`"${site}" is not in Authentication → Settings → Authorized domains.`);
    }

    // 3. Can Firebase start a Google sign-in at all?
    const g = await get(`https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${apiKey}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId: 'google.com', continueUri: `https://${authDomain}/__/auth/handler` }),
    });
    let started = false;
    try { started = Boolean(JSON.parse(g.body)?.authUri); } catch { /* error body */ }
    googleProvider = { status: g.status, canStart: started, error: started ? '' : apiError(g.body) };
    if (!started && /app check/i.test(g.body)) {
      problems.push(
        'App Check enforcement is switched ON for Authentication, and the site is not passing it' +
        (appCheckKeySet ? ' (the reCAPTCHA key in NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY is being rejected).' : ' (no App Check key is set in Vercel).') +
        ' This blocks every sign-in. Fix: Firebase console → App Check → APIs → Authentication → Unenforce.'
      );
    } else if (!started) {
      problems.push(`Firebase could not start a Google sign-in (${g.status}${apiError(g.body) ? ` — ${apiError(g.body)}` : ''}). Check Authentication → Sign-in method → Google: it must be enabled and have a support email.`);
    }
  }

  return Response.json(
    {
      site,
      result: problems.length === 0 ? 'No problem found from the server side.' : 'Problems found — see "problems".',
      problems,
      settings,
      helper,
      keyMatchesProject,
      project,
      googleProvider,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
