import { LRUCache } from "lru-cache";

const options = {
  max: 500,
  ttl: 1000 * 60 * 3,
};

export const cache = new LRUCache(options);
