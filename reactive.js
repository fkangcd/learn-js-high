let activeReactiveFn = null

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(reactiveFn) {
    if(reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  depend() {
    if(activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      console.log(fn)
      fn()
    })
  }
}


function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

const targetMap = new WeakMap()
function getDepend(target, key) {
  let map = targetMap.get(target)
  if(!map) {
    map = new Map()
    targetMap.set(target, map)
  }
  let depend = map.get(key)
  if(!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

function reactive(obj) {
  return new Proxy(obj, {
    get: function(target, key, receiver) {
      const depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      const depend = getDepend(target, key)
      console.log(depend.reactiveFns)
      depend.notify()
    }
  })
}

const obj = reactive({
  name: "why",
  age: 18
})
obj.name = "kobe"

watchFn(function() {
  const newName = obj.name
  console.log(obj.name,"foo----")
})

watchFn(function() {
  console.log(obj.name,"demo----")
})




