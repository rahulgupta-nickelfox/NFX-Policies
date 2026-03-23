// Raw shape returned by Microsoft Graph for a drive item (file)
export interface GraphDriveItem {
  id: string;
  name: string;
  size: number;
  lastModifiedDateTime: string;
  eTag: string;
  webUrl: string;
  file?: {
    mimeType: string;
  };
  '@microsoft.graph.downloadUrl'?: string;
}

// Enriched policy file returned by /api/policies
export interface PolicyFile {
  id: string; // Supabase policy_documents.id (UUID)
  sharepointItemId: string; // Graph driveItem.id
  name: string;
  fileType: 'pdf' | 'docx' | 'pptx' | 'other';
  lastModified: string;
  version: string; // eTag
  acknowledged: boolean;
  acknowledgedAt: string | null;
}
