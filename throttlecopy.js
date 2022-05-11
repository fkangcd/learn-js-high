function throttle1(fn, delay) {
  let lasttime = 0
  return function() {
    const nowtime = new Date().getTime()
    if(nowtime - lasttime >= delay) {
      fn()
      lasttime = nowtime
    }
  }
}

function throttle2(fn, delay) {
  let timer = null
  return function() {
    if(!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, delay)
    }
  }
}