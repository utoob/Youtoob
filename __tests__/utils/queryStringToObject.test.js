import queryStringToObject from '../../client/utils/queryStringToObject'

// `a=1&b=2` should return { a: "1", b: "2" }
// `?a=1&b=2` should return { a: "1", b: "2" }
// `=1&xc2&b=1` should return { b: "1" }
// `======` should return { }
// `?&&&&&&&` should return { }

test('`a=1&b=2` should return { a: "1", b: "2" }', () => {
  expect(queryStringToObject(`a=1&b=2`)).toEqual({ a: "1", b: "2" })
})

test('`?a=1&b=2` should return { a: "1", b: "2" }', () => {
  expect(queryStringToObject(`?a=1&b=2`)).toEqual({ a: "1", b: "2" })
})

test('`=1&xc2&b=1` should return { b: "1" }', () => {
  expect(queryStringToObject(`=1&xc2&b=1`)).toEqual({ b: "1" })
})

test('`======` should return { }', () => {
  expect(queryStringToObject(`======`)).toEqual({})
})

test('`?&&&&&&&` should return { }', () => {
  expect(queryStringToObject(`?&&&&&&&`)).toEqual({})
})