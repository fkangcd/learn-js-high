class FkCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
      this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key) {
    let value = this.storage.getItem(key)
    if(value) {
      vlaue = JSON.parse(value)
    }
    return value
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  key(index) {
    return this.storage.key(index)
  }

  length() {
    return this.storage.length
  }

}

const localCache = new FkCache()
const sessionCache = new FkCache(false)

export {
  localCache,sessionCache
}