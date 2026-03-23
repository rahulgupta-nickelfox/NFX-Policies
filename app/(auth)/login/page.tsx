import { LoginButton } from '@/features/auth/components/LoginButton';
import Image from 'next/image';

const features = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: 'Always up to date',
    description: 'Policies sync automatically from SharePoint',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 1 0 1.06L9.33 13.773l-2.834-2.833a.75.75 0 0 1 1.06-1.06l1.773 1.772 3.997-3.997a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: 'Track acknowledgements',
    description: "See exactly which policies you've reviewed and signed off",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: 'Secure & compliant',
    description: 'Organisation-only access enforced via Microsoft Entra ID',
  },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* ── Left branding panel ─────────────────────────────── */}
      <div className="login-panel relative hidden overflow-hidden lg:flex lg:w-[55%] lg:flex-col lg:justify-between lg:p-14">
        {/* Animated orbs */}
        <div className="login-orb login-orb-1 absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-3xl" />
        <div className="login-orb login-orb-2 absolute top-1/2 -right-40 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="login-orb login-orb-3 absolute -bottom-24 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Dot-grid overlay */}
        <div className="login-dotgrid absolute inset-0" />

        {/* Top: wordmark */}
        <div className="relative z-10 flex items-center gap-3">
          {/* <Image
            src="/nickelfox.png"
            alt="Nickelfox"
            width={36}
            height={36}
            unoptimized
            className="brightness-0 invert"
          /> */}
          <span className="text-lg font-bold tracking-tight text-white">NFX Policies</span>
        </div>

        {/* Mid: headline + features */}
        <div className="relative z-10 max-w-md">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Policy Management Portal
          </div>
          <h1 className="mb-5 text-5xl leading-tight font-extrabold tracking-tight text-white">
            Company policies,
            <br />
            <span className="login-gradient-text">done right.</span>
          </h1>
          <p className="mb-12 text-lg leading-relaxed text-slate-400">
            One place to read, track, and acknowledge every company policy your team needs to stay
            compliant.
          </p>

          <ul className="space-y-6">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/15 text-blue-400">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: fine print */}
        <p className="relative z-10 text-xs text-slate-700">© 2026 NFX. All rights reserved.</p>
      </div>

      {/* ── Right login panel ────────────────────────────────── */}
      <div className="bg-background flex flex-1 flex-col items-center justify-center px-6 py-16">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2 lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nickelfox.png" alt="Nickelfox" width={32} height={32} />
          <span className="text-text-primary text-base font-bold">NFX Policies</span>
        </div>

        <div className="w-full max-w-[380px]">
          <div className="mb-8">
            <h2 className="text-text-primary mb-2 text-3xl font-bold">Welcome back</h2>
            <p className="text-text-secondary">
              Sign in with your organisation account to continue.
            </p>
          </div>

          {/* Card */}
          <div className="border-border bg-surface rounded-2xl border p-7 shadow-lg">
            <LoginButton />

            <div className="mt-5 flex items-center gap-3">
              <div className="bg-border h-px flex-1" />
              <span className="text-text-disabled text-xs">protected by</span>
              <div className="bg-border h-px flex-1" />
            </div>

            <div className="text-text-secondary mt-4 flex items-center justify-center gap-2 text-xs">
              {/* Microsoft logo */}
              <svg viewBox="0 0 21 21" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Microsoft Entra ID
            </div>
          </div>

          <p className="text-text-disabled mt-6 text-center text-xs">
            Access is restricted to{' '}
            <span className="text-text-secondary font-medium">organisation accounts</span> only.
          </p>
        </div>
      </div>
    </div>
  );
}
