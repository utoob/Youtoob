/* The queryStringToObject function takes in a query string parameter.
 * For example, "?query=hello&orderAt=-createdAt"
 * Should return { query: "hello", orderAt: "-createdAt" }
 */ 

import queryStringToObject from '../../client/utils/queryStringToObject'

/* Write these tests, implement the function incrementally and pass the tests one by one.
 * 1. `a=1&b=2` should return { a: "1", b: "2" } (Already written for you)
 * 2. `?a=1&b=2` should return { a: "1", b: "2" }
 * 3. `=1&xc2&b=1` should return { b: "1" }
 * 4. `======` should return { }
 * 5. `?&&&&&&&` should return { }
 */

test('`a=1&b=2` should return { a: "1", b: "2" }', () => {
  expect(queryStringToObject(`a=1&b=2`)).toEqual({ a: "1", b: "2" })
})

test('`?a=1&b=2` should return { a: "1", b: "2" }', () => {
  expect(queryStringToObject(`?a=1&b=2`)).toEqual({ a: "1", b: "2" })
})

test('`=1&xc2&b=1` should return { b: "1" }', () => {
  expect(queryStringToObject(`=1&xc2&b=1`)).toEqual({ b: "1" })
})

test('`======` should return {}', () => {
  expect(queryStringToObject(`======`)).toEqual({})
})

test('`?&&&&&&&` should return {}', () => {
  expect(queryStringToObject(`?&&&&&&&`)).toEqual({})
})