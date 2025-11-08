import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;

  constructor() {
    const ttl = (parseInt(process.env.CACHE_DURATION || '5')) * 60;
    this.cache = new NodeCache({ 
      stdTTL: ttl,
      checkperiod: 60
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T): boolean {
    return this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  del(key: string): number {
    return this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }

  stats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

export default new CacheService();
