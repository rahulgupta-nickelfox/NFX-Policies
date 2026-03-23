'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin, type ToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

interface PdfViewerProps {
  documentId: string;
}

export function PdfViewer({ documentId }: PdfViewerProps) {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  // Remove download, print, and open file buttons from the toolbar
  const transform = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
  });

  return (
    <div className="border-border h-full w-full overflow-hidden rounded-[var(--radius-md)] border">
      <Worker workerUrl="/pdf.worker.min.js">
        <div className="flex h-full flex-col">
          <div className="border-border bg-surface border-b px-2 py-1">
            <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
          </div>
          <div className="flex-1 overflow-hidden">
            <Viewer fileUrl={`/api/policies/${documentId}`} plugins={[toolbarPluginInstance]} />
          </div>
        </div>
      </Worker>
    </div>
  );
}
