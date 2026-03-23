import { PolicyList } from '@/features/policies/components/PolicyList';

export const metadata = { title: 'Policies — NFX' };

export default function PoliciesPage() {
  return (
    <div className="px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <div className="bg-accent/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <svg viewBox="0 0 20 20" fill="currentColor" className="text-accent h-4 w-4">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-text-secondary text-xs font-semibold tracking-widest uppercase">
            Policy Hub
          </span>
        </div>
        <h1 className="text-text-primary text-3xl font-bold">Company Policies</h1>
        <p className="text-text-secondary mt-1.5 text-sm">
          Read and acknowledge all required policy documents to stay compliant.
        </p>
      </div>

      <PolicyList />
    </div>
  );
}
