'use client';

import { signOut } from 'next-auth/react';
import { useSession } from '@/features/auth/hooks/useSession';
import { Button } from '@/components/ui/Button';

export function Topbar() {
  const { user } = useSession();

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? '?');

  return (
    <header
      style={{ height: 'var(--topbar-height)' }}
      className="border-border bg-background/80 sticky top-0 z-30 flex items-center justify-between border-b px-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nickelfox.png" alt="Nickelfox" width={24} height={24} />
        <span className="text-text-primary text-sm font-semibold">NFX Policies</span>
      </div>
      <span className="text-text-primary hidden text-sm font-semibold md:block">
        Company Policies
      </span>

      <div className="flex items-center gap-3">
        {/* Avatar + email */}
        <div className="flex items-center gap-2.5">
          <div className="bg-accent/15 text-accent flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold">
            {initials}
          </div>
          <span className="text-text-secondary hidden text-xs sm:block">{user?.email}</span>
        </div>

        <div className="bg-border h-4 w-px" />

        <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
