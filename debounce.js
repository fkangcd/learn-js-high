function debounce(fn, delay, immediate=false) {
  let timer = null
  let isInvoke =false
  function _debounce(...args) {
    if(immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    }
    
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      isInvoke = false
      timer = null
    }, delay)
  }

  _debounce.cancel = function() {
    if(timer) {
      clearTimeout(timer)
      timer = null
      isInvoke = false
    }
  }

  return _debounce
}