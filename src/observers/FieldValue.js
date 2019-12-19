import React from 'react'
import withFormState from '../hoc/withFormState'
import getFieldValue from '../getFieldValue'

const FieldValue = withFormState(
  ({ form, listInfo, fieldName, defaultText = '' }) => {
    let path = fieldName
    if (listInfo) {
      path = `${listInfo.name}.value[${listInfo.i}].${fieldName}`
      defaultText = defaultText.replace('%index%', listInfo.i + 1)
    }
    return <>{getFieldValue(form, path, defaultText) || defaultText}</>
  }
)

export default FieldValue
