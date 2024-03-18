import type { NextApiResponse } from 'next';
import { LRUCache } from 'lru-cache';
import { NextResponse } from 'next/server';

type Options = {
  uniqueuser_info_cookiePerInterval?: number;
  interval?: number;
};

const rateLimit = (options?: Options) => {
  const user_info_cookieCache = new LRUCache({
    max: options?.uniqueuser_info_cookiePerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (res: NextApiResponse, limit: number, user_info_cookie: string) =>
      new Promise<void>((resolve, reject) => {
        const user_info_cookieCount = (user_info_cookieCache.get(
          user_info_cookie
        ) as number[]) || [0];
        if (user_info_cookieCount[0] === 0) {
          user_info_cookieCache.set(user_info_cookie, user_info_cookieCount);
        }
        user_info_cookieCount[0] += 1;

        const currentUsage = user_info_cookieCount[0];
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
