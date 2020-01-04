import getFieldValue from '../src/getFieldValue'

test('getFieldValue', () => {
  const form = {
    fields: {
      name: {
        value: 'jeff'
      }
    }
  }
  const pathName = 'name'
  const defaultText = 'no value found'
  expect(getFieldValue(form, pathName, defaultText)).toBe('jeff')
  const pathNotExist = 'age'
  expect(getFieldValue(form, pathNotExist, defaultText)).toBe(defaultText)
})
