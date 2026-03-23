'use client';

import { usePolicies } from '../hooks/usePolicies';
import { usePolicyStore } from '../store/policyStore';
import { PolicyCard } from './PolicyCard';
import { PolicyViewer } from './PolicyViewer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import type { PolicyFile } from '@/types/policy';

export function PolicyList() {
  const { data: policies, isLoading, error } = usePolicies();
  const { openViewer } = usePolicyStore();

  function handleCardClick(policy: PolicyFile) {
    openViewer(policy.id, policy.name);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load policies"
        description="There was a problem fetching documents. Please refresh the page."
      />
    );
  }

  if (!policies || policies.length === 0) {
    return (
      <EmptyState
        title="No policies found"
        description="No policy documents have been added to the shared folder yet."
      />
    );
  }

  const total = policies.length;
  const read = policies.filter((p) => p.acknowledged);
  const unread = policies.filter((p) => !p.acknowledged);
  const pct = total > 0 ? Math.round((read.length / total) * 100) : 0;

  return (
    <>
      {/* Progress summary */}
      <div className="border-border bg-surface mb-8 rounded-2xl border p-5 shadow-sm">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-text-primary text-sm font-semibold">Your progress</p>
            <p className="text-text-secondary mt-0.5 text-xs">
              {read.length} of {total} policies acknowledged
            </p>
          </div>
          <span
            className={[
              'text-2xl font-bold tabular-nums',
              pct === 100 ? 'text-status-read' : 'text-accent',
            ].join(' ')}
          >
            {pct}%
          </span>
        </div>

        {/* Track */}
        <div className="bg-surface-alt h-2 w-full overflow-hidden rounded-full">
          <div
            className={[
              'h-full rounded-full transition-all duration-700',
              pct === 100 ? 'bg-status-read' : 'from-accent bg-gradient-to-r to-blue-400',
            ].join(' ')}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Stat chips */}
        <div className="mt-4 flex gap-3">
          <div className="border-border bg-surface-alt text-text-secondary flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
            <span className="bg-status-unread h-1.5 w-1.5 rounded-full" />
            {unread.length} pending
          </div>
          <div className="border-border bg-surface-alt text-text-secondary flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
            <span className="bg-status-read h-1.5 w-1.5 rounded-full" />
            {read.length} done
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {unread.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-status-unread h-1.5 w-1.5 rounded-full" />
              <h2 className="text-text-secondary text-xs font-semibold tracking-widest uppercase">
                Requires attention ({unread.length})
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unread.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} onClick={handleCardClick} />
              ))}
            </div>
          </section>
        )}

        {read.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-status-read h-1.5 w-1.5 rounded-full" />
              <h2 className="text-text-secondary text-xs font-semibold tracking-widest uppercase">
                Completed ({read.length})
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {read.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} onClick={handleCardClick} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Document viewer modal */}
      <PolicyViewer />
    </>
  );
}
