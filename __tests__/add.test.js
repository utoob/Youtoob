import add from '../src/add'

test('typeof add should return \"function\"', () => {
  expect(typeof add).toEqual('function')
})

test('add() should return null', () => {
  expect(add()).toEqual(null)
})

test('add(1, 1) should return 2', () => {
  expect(add(1, 1)).toEqual(2)
})

test('add(1, 2, 3) should return 6', () => {
  expect(add(1, 2, 3)).toEqual(6)
})

test('add("1", "1") should throw a TypeError', () => {
  expect(() => add("1", "1")).toThrowError(TypeError)
})