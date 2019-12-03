import ListContext from '../src/ListContext'

test('ListContext is React Context', () => {
  expect(typeof ListContext.Provider).toBe('object')
  expect(typeof ListContext.Consumer).toBe('object')
})
