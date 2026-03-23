import type { NextAuthConfig } from 'next-auth';

/**
 * Minimal auth config used by middleware (Edge runtime).
 * Must not import any Node.js-only modules (Supabase, crypto, etc.).
 * The full config with providers and callbacks lives in auth.ts.
 */
export const authConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [],
} satisfies NextAuthConfig;
