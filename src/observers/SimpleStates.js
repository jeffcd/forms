import React from 'react'
import withFormStateHoc from '../hoc/withFormState'

const SimpleStates = ({ form, stateStrs }) => {
  return <>{stateStrs[form.state]}</>
}

export default withFormStateHoc(SimpleStates)
