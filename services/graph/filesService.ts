import { env } from '@/lib/env';
import { getGraphClient } from './graphClient';
import type { GraphDriveItem } from '@/types/policy';

const { SHAREPOINT_SITE_ID, SHAREPOINT_DRIVE_ID, SHAREPOINT_FOLDER_ID } = env;

/**
 * Lists all files (not folders) inside the configured SharePoint folder.
 * Returns raw Graph driveItem objects.
 */
export async function listPoliciesFromSharePoint(): Promise<GraphDriveItem[]> {
  const client = await getGraphClient();

  const response = await client
    .api(
      `/sites/${SHAREPOINT_SITE_ID}/drives/${SHAREPOINT_DRIVE_ID}/items/${SHAREPOINT_FOLDER_ID}/children`
    )
    .select('id,name,file,size,lastModifiedDateTime,eTag,webUrl')
    .filter('file ne null') // exclude sub-folders
    .get();

  return (response.value ?? []) as GraphDriveItem[];
}

/**
 * Returns a short-lived (≈1hr) pre-authenticated download URL for a file.
 * NEVER cache this URL — fetch fresh on every request.
 * NEVER expose this URL directly to the browser.
 */
export async function getFileDownloadUrl(itemId: string): Promise<string> {
  const client = await getGraphClient();

  const item = await client
    .api(`/sites/${SHAREPOINT_SITE_ID}/drives/${SHAREPOINT_DRIVE_ID}/items/${itemId}`)
    .select('id,name,file,@microsoft.graph.downloadUrl')
    .get();

  const downloadUrl = item['@microsoft.graph.downloadUrl'];

  if (!downloadUrl) {
    throw new Error(`No download URL returned for item ${itemId}`);
  }

  return downloadUrl as string;
}

/**
 * Returns the MIME type for a given SharePoint item.
 */
export async function getFileMimeType(itemId: string): Promise<string> {
  const client = await getGraphClient();

  const item = await client
    .api(`/sites/${SHAREPOINT_SITE_ID}/drives/${SHAREPOINT_DRIVE_ID}/items/${itemId}`)
    .select('file')
    .get();

  return (item.file?.mimeType as string) ?? 'application/octet-stream';
}
