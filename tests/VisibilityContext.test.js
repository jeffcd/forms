import VisibilityContext from '../src/VisibilityContext'

test('VisibilityContext is React Context', () => {
  expect(typeof VisibilityContext.Provider).toBe('object')
  expect(typeof VisibilityContext.Consumer).toBe('object')
})
