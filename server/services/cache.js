import NodeCache from 'node-cache';

const DEFAULT_TTL = 600;

class Cache {
  constructor(options) {
    this.cache = new NodeCache(options);
  }

  check(key) {
    return this.cache.has(key);
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl = DEFAULT_TTL) {
    return this.cache.set(key, value, ttl);
  }

  del(keys) {
    this.cache.del(keys);
  }
}

export default Cache;
