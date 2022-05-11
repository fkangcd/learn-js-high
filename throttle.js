/* function throttle(fn, delay, immediate = false) {
  let flag = true
  let isInvoke = false
  return function() {
    if(immediate && !isInvoke) {
      fn()
      isInvoke = true
    }
    if(flag) {
      setTimeout(() => {
        fn()
        flag = true
      }, delay)
    }
    flag = false
  }
} */

function throttle(fn, delay, options = {leading: true, trailing: true}) {
  let lasttime = 0
  let timer = null
  const {leading, trailing} = options
  function _throttle(...args) {
    const nowtime = new Date().getTime()

    if(!leading && !lasttime) {
      lasttime = nowtime
    }

    const remaintime = delay - (nowtime - lasttime)
    
    if(remaintime <= 0) {
      if(timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      lasttime = nowtime
      return
    }

    if(trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lasttime = !leading ? 0 : new Date().getTime()
        fn.apply(this, args)

      }, remaintime)
    }

  }

  _throttle.cancel = function() {
    if(timer) {
      clearTimeout(timer)
      lasttime = 0
      timer = null
    }
  }

  return _throttle
}