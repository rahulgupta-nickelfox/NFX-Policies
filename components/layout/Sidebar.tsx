'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/policies',
    label: 'Policies',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{ width: 'var(--sidebar-width)' }}
      className="border-border bg-surface hidden shrink-0 flex-col border-r md:flex"
    >
      {/* Brand */}
      <div className="border-border flex h-[var(--topbar-height)] items-center gap-3 border-b px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nickelfox.png" alt="Nickelfox" width={28} height={28} />
        <span className="text-text-primary text-sm font-bold tracking-tight">NFX Policies</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-text-disabled mb-1 px-3 text-[10px] font-semibold tracking-widest uppercase">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
              ].join(' ')}
            >
              <span className={isActive ? 'text-accent' : 'text-text-disabled'}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-border border-t px-5 py-3">
        <p className="text-text-disabled text-[10px]">© 2026 NFX</p>
      </div>
    </aside>
  );
}
