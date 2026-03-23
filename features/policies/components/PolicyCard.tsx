import { ReadBadge } from './ReadBadge';
import type { PolicyFile } from '@/types/policy';

interface PolicyCardProps {
  policy: PolicyFile;
  onClick: (policy: PolicyFile) => void;
}

function FileTypeIcon({ type }: { type: string }) {
  if (type === 'pdf') {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }
  if (type === 'docx') {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }
  if (type === 'pptx') {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="bg-surface-alt text-text-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: 'PDF',
  docx: 'Word Document',
  pptx: 'PowerPoint',
  other: 'Document',
};

export function PolicyCard({ policy, onClick }: PolicyCardProps) {
  return (
    <div
      onClick={() => onClick(policy)}
      className={[
        'group bg-surface relative cursor-pointer overflow-hidden rounded-2xl border p-5 shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        policy.acknowledged
          ? 'border-border'
          : 'border-status-unread/30 hover:border-status-unread/50',
      ].join(' ')}
    >
      {/* Subtle top accent line for unread */}
      {!policy.acknowledged && (
        <div className="from-status-unread/60 absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r to-transparent" />
      )}

      <div className="flex items-start gap-3">
        <FileTypeIcon type={policy.fileType} />

        <div className="min-w-0 flex-1">
          <p className="text-text-primary truncate text-sm leading-snug font-semibold">
            {policy.name}
          </p>
          <p className="text-text-secondary mt-0.5 text-xs">
            {FILE_TYPE_LABELS[policy.fileType] ?? 'Document'}
          </p>
        </div>

        <ReadBadge acknowledged={policy.acknowledged} />
      </div>

      {policy.acknowledgedAt && (
        <div className="text-text-secondary mt-4 flex items-center gap-1.5 text-xs">
          <svg viewBox="0 0 16 16" fill="currentColor" className="text-status-read h-3 w-3">
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.646-1.643a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.12-.08l4.224-5.46Z"
              clipRule="evenodd"
            />
          </svg>
          Acknowledged {new Date(policy.acknowledgedAt).toLocaleDateString()}
        </div>
      )}

      {/* Hover arrow */}
      <div className="text-text-disabled absolute right-4 bottom-4 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
          <path
            fillRule="evenodd"
            d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
