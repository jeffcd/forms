import React, { useEffect } from 'react'
import asField from '../hoc/asField'

const SetField = asField(({ onChange, setValue }) => {
  useEffect(() => {
    onChange({ target: { value: setValue } })
  }, [setValue])
  return <></>
})

export default SetField
