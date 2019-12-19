import get from 'lodash/get'

const getFieldValue = (form, path, defaultText) =>
  get(form, `fields.${path}.value`, defaultText)

export default getFieldValue
