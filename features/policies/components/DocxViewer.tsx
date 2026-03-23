'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface DocxViewerProps {
  documentId: string;
}

type ViewerState =
  | { documentId: string; status: 'loading' }
  | { documentId: string; status: 'success'; html: string }
  | { documentId: string; status: 'error'; message: string };

export function DocxViewer({ documentId }: DocxViewerProps) {
  const [state, setState] = useState<ViewerState>({ documentId, status: 'loading' });

  const isLoading = state.documentId !== documentId || state.status === 'loading';
  const html = state.status === 'success' && state.documentId === documentId ? state.html : null;
  const error = state.status === 'error' && state.documentId === documentId ? state.message : null;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/policies/${documentId}/html`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.json();
      })
      .then((data: { html: string }) =>
        setState({ documentId, status: 'success', html: data.html })
      )
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setState({ documentId, status: 'error', message: err.message });
        }
      });

    return () => controller.abort();
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !html) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-text-primary text-sm font-medium">Preview unavailable</p>
        <p className="text-text-secondary mt-1 text-xs">
          This document format cannot be previewed. Please contact IT support.
        </p>
      </div>
    );
  }

  return (
    <div
      className="policy-docx-body mx-auto max-w-3xl px-8 py-6"
      onContextMenu={(e) => e.preventDefault()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
