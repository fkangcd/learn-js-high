function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === "object" || valueType === "function")
}

function deepClone(orginValue) {
  if(!isObject(orginValue)) {
    return orginValue
  }
  if(typeof orginValue === "function") {
    return orginValue
  }



  const newobj = Array.isArray(orginValue) ? [] : {}
  for(key in orginValue) {
    newobj[key] = deepClone(orginValue[key])
  }

  return newobj
}

const obj = {
  name: "kobe",
  age: 35,
  hobbies: ["篮球","羽毛球","乒乓球"],
  eat: function() {console.log("eat")},
  friends: {
    name: "jeams",
    age: 30,
    address: {
      city: "la"
    }
  }
}

const newobj = deepClone(obj)

console.log(newobj)
