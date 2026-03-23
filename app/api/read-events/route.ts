import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/apiAuth';
import { env } from '@/lib/env';

const schema = z.object({
  documentId: z.string().uuid(),
});

export async function POST(req: Request) {
  const { session, supabase, error } = await requireAuth();
  if (error) return error;

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Look up internal user ID
  const { data: userRow } = await supabase!
    .from('users')
    .select('id')
    .eq('azure_object_id', session!.user.azureOid)
    .single();

  if (!userRow) return new Response('User not found', { status: 404 });

  const { data, error: dbError } = await supabase!
    .from('read_events')
    .insert({
      organization_id: env.DEFAULT_ORG_ID,
      user_id: userRow.id,
      document_id: parsed.data.documentId,
      started_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ readEventId: data.id }, { status: 201 });
}
