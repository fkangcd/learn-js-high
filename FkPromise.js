const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

function execFunctionWithError(fn, value, resolve, reject) {
  try {
    const result = fn(value)
    resolve(result)
  }catch(err) {
    reject(err)
  }
}


class FkPromise {
  constructor(executor) {

    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if(this.status === PROMISE_STATUS_PENDING) {
            this.status = PROMISE_STATUS_FULFILLED
            this.value = value
            this.onFulfilledFns.forEach(fn => fn())
          }
          
        })
      }

    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if(this.status === PROMISE_STATUS_PENDING) {
            this.status = PROMISE_STATUS_REJECTED
            this.reason = reason
            this.onRejectedFns.forEach(fn => fn())
          }    
          
        })
      }
    }

    executor(resolve, reject)

  }

  then(onFulfilled, onRejected) {
    onFulfilled = onFulfilled || (res => {return res})
    onRejected = onRejected || (err => {throw err})
    return new FkPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithError(onFulfilled, this.value, resolve, reject)
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithError(onRejected, this.reason, resolve, reject)
      }
      if(this.status === PROMISE_STATUS_PENDING) {
          if(onFulfilled) this.onFulfilledFns.push(() => {
            execFunctionWithError(onFulfilled, this.value, resolve, reject)
          })
          if(onRejected) this.onRejectedFns.push(() => {
            execFunctionWithError(onRejected, this.reason, resolve, reject)
          })
      }
    })
  }

  catch(onRejected) {
    this.then(undefined, onRejected)
  }

  finally(onFulfilled) {
    this.then(() => {
      onFulfilled
    }, () => {
      onFulfilled
    })
  }

  static resolve(value) {
    return new FkPromise((resolve) => {resolve(value)})
  }

  static reject(reason) {
    return new FkPromise((resolve, reject) => {reject(reason)})
  }

  static all(promises) {
    const results = []
    return new FkPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(res => {
          results.push(res)
          if(results.length === promises.length) {
            resolve(results)
          }
        }, err => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    const results = []
    return new FkPromise((resolve) => {
      promises.forEach(promise => {
        promise.then(res => {
          results.push({status: PROMISE_STATUS_FULFILLED, value: res})
          if(results.length === promises.length) {
            resolve(results)
          }     
        }, err => {
          results.push({status: PROMISE_STATUS_REJECTED, value: err})
          if(results.length === promises.length) {
            resolve(results)
          }     
        })
      })
    })
  }

  static race(promises) {
    return new FkPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }

  static any() {
    const results = []
    return new FkPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, err => {
          results.push(err)
          if(results.length === promises.length) {
            reject(new AggregateError(results))
          }     
        })
      })
    })
  }

}

const p1 = new FkPromise((resolve, reject) => {
  resolve("111")
})
const p2 = new FkPromise((resolve, reject) => {
  reject("222")
})
const p3 = new FkPromise((resolve, reject) => {
  resolve("333")
})

FkPromise.race([p1, p2, p3]).then(res => {
  console.log(res)
}, err => {
  console.log(err)
})

const s1 = new Promise((resolve, reject) => {
  resolve("1111")
})
const s2 = new Promise((resolve, reject) => {
  reject("2222")
})
const s3 = new Promise((resolve, reject) => {
  resolve("3333")
})

Promise.any([s1, s2, s3]).then(res => {
  console.log(res)
}, err => {
  console.log(err)
})