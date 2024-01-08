import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachedService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCached<T>(
    key: string,
    functionRequest: () => Promise<T>,
  ): Promise<T> {
    const allData: T = await this.cacheManager.get(key);

    if (allData) {
      return allData;
    }

    const data: T = await functionRequest();

    await this.cacheManager.set(key, data);

    return data;
  }
}
