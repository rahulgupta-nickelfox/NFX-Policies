import { useMutation } from '@tanstack/react-query';

interface LogReadEventInput {
  documentId: string;
}

interface LogReadEventOutput {
  readEventId: string;
}

async function logReadEvent(input: LogReadEventInput): Promise<LogReadEventOutput> {
  const res = await fetch('/api/read-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to log read event');
  return res.json();
}

export function useLogReadEvent() {
  return useMutation({
    mutationFn: logReadEvent,
    // No cache invalidation needed — read events are fire-and-forget audit logs
  });
}
