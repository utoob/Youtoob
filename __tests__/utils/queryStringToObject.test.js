/* The queryStringToObject function takes in a query string parameter.
 * For example, "?query=hello&orderAt=-createdAt"
 * Should return { query: "hello", orderAt: "-createdAt" }
 */ 

import queryStringToObject from '../../client/utils/queryStringToObject'

/* To pass the prompt: 
 * - Write these tests, implement the function incrementally and pass the tests one by one.
 * - Implement the function queryStringToObject in `client/utils/queryStringToObject`
 *
 * Test for these cases:
 * 1. typeof queryStringToObject should be function
 * 2. `a=1&b=2` should return { a: "1", b: "2" } (Already written for you)
 * 3. `?a=1&b=2` should return { a: "1", b: "2" }
 * 4. `=1&xc2&b=1` should return { b: "1" }
 * 5. `======` should return { }
 * 6. `?&&&&&&&` should return { }
 */

test('typeof queryStringToObject should be function', () => {
  expect(typeof queryStringToObject).toEqual('function')
})