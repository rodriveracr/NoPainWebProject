// 🛡️ Rate Limiter - Protección contra spam/bots
// Almacena: IP -> { count, resetTime }

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Limita requests por IP
 * @param ip - IP address del cliente
 * @param maxRequests - Max requests permitidos
 * @param windowMs - Ventana de tiempo en ms (default: 60000 = 1 min)
 * @returns true si OK, false si excedió límite
 */
export function rateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // Nueva ventana
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count < maxRequests) {
    entry.count++;
    return true;
  }

  // Excedió límite
  return false;
}

/**
 * Obtiene info del rate limit (para logs/debug)
 */
export function getRateLimitInfo(ip: string): { count: number; remaining: number; resetTime: number } {
  const entry = rateLimitMap.get(ip);
  const now = Date.now();

  if (!entry || now > entry.resetTime) {
    return { count: 0, remaining: 5, resetTime: now + 60000 };
  }

  return {
    count: entry.count,
    remaining: Math.max(0, 5 - entry.count),
    resetTime: entry.resetTime,
  };
}

/**
 * Limpia entries antiguas (ejecutar cada 10 min aproximadamente)
 */
export function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}
