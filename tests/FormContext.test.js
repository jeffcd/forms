import FormContext from '../src/FormContext'

test('FormContext is React Context', () => {
  expect(typeof FormContext.Provider).toBe('object')
  expect(typeof FormContext.Consumer).toBe('object')
})
