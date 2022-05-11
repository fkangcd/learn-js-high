function requestDate(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

function* getDate() {
  const res1 = yield requestDate('why')
  const res2 = yield requestDate(res1 + 'aa')
  const res3 = yield requestDate(res2 + 'bb')
  const res4 = yield requestDate(res3 + 'cc')
  console.log(res4)
}

const generator = getDate()
generator.next().value.then(res => {
  generator.next(res).value.then(res => {
    generator.next(res).value.then(res => {
      generator.next(res).value.then(res => {
        generator.next(res)
      })
    })
  })
})

/* async function getDate() {
  const res1 = await requestDate('why')
  console.log(res1)
  const res2 = await requestDate(res1 + 'aa')
  console.log(res2)
  const res3 = await requestDate(res2 + 'bb')
  console.log(res3)
}
getDate() */

/* function* getDate() {
  const res1 = yield requestDate('why')
  console.log(res1)
  const res2 = yield requestDate(res1 + 'aa')
  console.log(res2)
  const res3 = yield requestDate(res2 + 'bb')
  console.log(res3)
} */

/* const foo = getDate()
foo.next().value.then(res => {
  foo.next(res).value.then(res => {
    foo.next(res).value.then(res => {
      foo.next(res)
    })
  })
}) */

/* function execGenerator(getFn) {
  const foo = getFn()

  function exec(res) {
    console.log(res)
    const result = foo.next(res)
    if(result.done) {
      return result.value
    }
    result.value.then(res => {
      exec(res)
    })
  }

  exec()
}

execGenerator(getDate) */