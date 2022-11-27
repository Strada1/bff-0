import NodeCache from 'node-cache'
const cache = new NodeCache()

const getCache = key => {
  return cache.get(key)
}

const setCache = (key, val, ttl) => {
  return cache.set(key, val, ttl)
}

const hasCache = key => {
  return cache.has(key)
}
const deleteCache = key => {
  return cache.del(key)
}

export {getCache, setCache, hasCache, deleteCache}
