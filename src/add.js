const add = (...params) => {
  let val = null
  if (params.length) {
    val = 0
    for (let num of params) {
      if (typeof num === 'number')
        val += num
      else 
        throw new TypeError(`${num} is not a number.`)
    }
      
  }
  return val
}

export default add