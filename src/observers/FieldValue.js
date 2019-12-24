import React from 'react'
import withFormState from '../hoc/withFormState'
import getFieldValue from '../getFieldValue'

const FieldValue = withFormState(
  ({ form, listInfo, fieldName, defaultText = '', fromRoot = false }) => {
    let path = fieldName
    if (listInfo && !fromRoot) {
      path = `${listInfo.name}.value[${listInfo.i}].${fieldName}`
      defaultText = defaultText.replace('%index%', listInfo.i + 1)
    }
    return <>{getFieldValue(form, path, defaultText) || defaultText}</>
  }
)

export default FieldValue
