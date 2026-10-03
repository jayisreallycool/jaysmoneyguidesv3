import 'server-only';

/**
 * Small in-memory flood guard for public form endpoints. Per server instance
 * and reset on cold start — enough to stop one client hammering a form.
 */
const buckets = new Map<string, { n: number; resetAt: number }>();

export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hit = buckets.get(key);
  if (!hit || now > hit.resetAt) {
    buckets.set(key, { n: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    return true;
  }
  hit.n += 1;
  return hit.n <= limit;
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
