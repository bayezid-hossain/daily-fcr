import type { NextApiResponse } from 'next';
import { LRUCache } from 'lru-cache';
import { NextResponse } from 'next/server';

type Options = {
  uniquetokenPerInterval?: number;
  interval?: number;
};

const rateLimit = (options?: Options) => {
  const tokenCache = new LRUCache({
    max: options?.uniquetokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        // res.headers.append('X-RateLimit-Limit', limit.toString());
        res.setHeader('X-RateLimit-Limit', limit.toString());
        // res.headers.set('X-RateLimit-Limit', limit.toString());
        // res.headers.set(
        //   'X-RateLimit-Limit',
        //   isRateLimited ? '0' : (limit - currentUsage).toString()
        // );

        return isRateLimited ? reject() : resolve();
      }),
  };
};

export default rateLimit;
