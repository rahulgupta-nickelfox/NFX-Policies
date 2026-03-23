'use client';

import { Button } from '@/components/ui/Button';

interface AcknowledgementBannerProps {
  acknowledged: boolean;
  isLoading: boolean;
  onAcknowledge: () => void;
}

export function AcknowledgementBanner({
  acknowledged,
  isLoading,
  onAcknowledge,
}: AcknowledgementBannerProps) {
  if (acknowledged) {
    return (
      <div className="border-border bg-accent-light flex items-center gap-2 border-t px-6 py-4">
        <span className="text-status-read text-sm font-medium">
          ✓ You have acknowledged this document
        </span>
      </div>
    );
  }

  return (
    <div className="border-border bg-surface flex items-center justify-between border-t px-6 py-4">
      <p className="text-text-secondary text-sm">
        Please read the full document before acknowledging.
      </p>
      <Button
        variant="primary"
        size="sm"
        onClick={onAcknowledge}
        isLoading={isLoading}
        disabled={isLoading}
      >
        I have read this document
      </Button>
    </div>
  );
}
