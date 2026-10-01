'use client';
import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { User } from '@/lib/types';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  refresh: () => void;
  logout: () => Promise<{ ok: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null, loading: true, refresh: () => {}, logout: async () => ({ ok: true }),
});

import { isAdminEmailClient } from '@/lib/admin-config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Lazy-import Firebase auth — defers the ~100KB firebase/auth bundle
    // until after initial paint, improving LCP and TTI.
    import('@/lib/firebase-client').then(({ watchAuth }) => {
      if (cancelled) return;
      const unsub = watchAuth((fbUser) => {
        if (cancelled) return;
        if (fbUser) {
          setUser({
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Member',
            email: fbUser.email || '',
            avatar: fbUser.photoURL || undefined,
            provider: fbUser.providerData[0]?.providerId?.includes('google') ? 'google' : 'email',
            createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
            role: isAdminEmailClient(fbUser.email) ? 'admin' : 'user',
          } as User);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      unsubRef.current = unsub;
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
      unsubRef.current?.();
    };
  }, []);

  const refresh = useCallback(() => { /* onAuthStateChanged handles real-time updates */ }, []);

  const logout = useCallback(async () => {
    const { signOutUser } = await import('@/lib/firebase-client');
    const r = await signOutUser();
    setUser(null);
    return r;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
