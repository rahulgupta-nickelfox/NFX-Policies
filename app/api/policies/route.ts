import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/apiAuth';
import { listPoliciesFromSharePoint } from '@/services/graph/filesService';
import { fileTypeFromMime, fileTypeFromName } from '@/utils/fileUtils';
import { env } from '@/lib/env';

export async function GET() {
  const { session, supabase, error } = await requireAuth();
  if (error) return error;

  // 1. Fetch files from SharePoint
  const graphItems = await listPoliciesFromSharePoint();

  // 2. Upsert new/changed files into policy_documents
  if (graphItems.length > 0) {
    const upsertRows = graphItems.map((item) => ({
      organization_id: env.DEFAULT_ORG_ID,
      sharepoint_item_id: item.id,
      name: item.name,
      file_type: item.file?.mimeType
        ? fileTypeFromMime(item.file.mimeType)
        : fileTypeFromName(item.name),
      version: item.eTag,
      is_active: true,
    }));

    await supabase!
      .from('policy_documents')
      .upsert(upsertRows, { onConflict: 'organization_id,sharepoint_item_id' });
  }

  // 3. Fetch Supabase records (now upserted)
  const { data: docs } = await supabase!
    .from('policy_documents')
    .select('id, sharepoint_item_id, name, file_type, version, is_active')
    .eq('organization_id', env.DEFAULT_ORG_ID)
    .eq('is_active', true);

  if (!docs) return NextResponse.json([]);

  // 4. Fetch user's acknowledgements
  const { data: userRow } = await supabase!
    .from('users')
    .select('id')
    .eq('azure_object_id', session!.user.azureOid)
    .single();

  const { data: acks } = userRow
    ? await supabase!
        .from('acknowledgements')
        .select('document_id, document_version, acknowledged_at')
        .eq('user_id', userRow.id)
    : { data: [] };

  const ackMap = new Map((acks ?? []).map((a) => [`${a.document_id}_${a.document_version}`, a]));

  // 5. Merge and return
  const result = docs.map((doc) => {
    const ack = ackMap.get(`${doc.id}_${doc.version}`);
    return {
      id: doc.id,
      sharepointItemId: doc.sharepoint_item_id,
      name: doc.name,
      fileType: doc.file_type,
      version: doc.version,
      acknowledged: !!ack,
      acknowledgedAt: ack?.acknowledged_at ?? null,
    };
  });

  return NextResponse.json(result);
}
