import React, { useEffect } from 'react'
import asField from '../hoc/asField'

const SetField = asField(({ onChange, value, setValue }) => {
  useEffect(() => {
    if (value !== setValue) {
      onChange({ target: { value: setValue } })
    }
  }, [setValue])
  return <></>
})

export default SetField
