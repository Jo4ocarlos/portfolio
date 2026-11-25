export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

interface RateLimiterOptions {
  maxRequests: number;
  windowMs: number;
  now?: () => number;
}

interface RequestWindow {
  count: number;
  resetAt: number;
}

/**
 * Janela fixa em memória. Na Vercel cada instância tem a própria contagem, então isto contém
 * abuso comum, mas não substitui uma regra no firewall ou um contador compartilhado.
 */
export function createRateLimiter({ maxRequests, windowMs, now = Date.now }: RateLimiterOptions) {
  const windows = new Map<string, RequestWindow>();

  function removeExpired(time: number) {
    for (const [key, { resetAt }] of windows) {
      if (resetAt <= time) windows.delete(key);
    }
  }

  return {
    check(key: string): RateLimitResult {
      const time = now();
      removeExpired(time);

      const current = windows.get(key);
      if (!current) {
        windows.set(key, { count: 1, resetAt: time + windowMs });
        return { allowed: true };
      }

      if (current.count >= maxRequests) {
        return { allowed: false, retryAfterSeconds: Math.ceil((current.resetAt - time) / 1000) };
      }

      current.count += 1;
      return { allowed: true };
    },
  };
}

/** A Vercel sobrescreve x-forwarded-for, então lá o visitante não consegue forjar o primeiro valor. */
export function getClientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}
