/* const info = {
  student: ['a', 'b', 'c'],
  [Symbol.iterator]: function() {
    let index= 0
    return {
      next: () => {
        if(index < this.student.length) {
          return {done: 'false', value: this.student[index++]}
        }else {
          return {done: 'true', value: undefined}
        }
      }
    }
  }
} */

class classRoom {
  constructor(address, students) {
    this.address = address,
    this.students = students
  }

  entry(student) {
    this.students.push(student)
  }

  [Symbol.iterator]() {
    let index= 0
    return {
      next: () => {
        if(index < this.students.length) {
          return {done: 'false', value: this.students[index++]}
        }else {
          return {done: 'true', value: undefined}
        }
      }
    }
  }
}


/* function createIterator(arr) {
  let index= 0
  return {
    next: function() {
      if(index < arr.length) {
        return {done: 'false', value: arr[index++]}
      }else {
        return {done: 'true', value: undefined}
      }
    }
  }
} */
const foo = new classRoom('3栋', ['a', 'b', 'c'])
foo.entry('d')
console.log(foo.students)
const bar = foo[Symbol.iterator]()
console.log(bar.next())
console.log(bar.next())
console.log(bar.next())
console.log(bar.next())
console.log(bar.next())
console.log(bar.next())

/* 
console.log(app.next())
console.log(app.next())
console.log(app.next())
console.log(app.next()) */