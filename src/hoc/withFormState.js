import React from 'react'
import FormContext from '../FormContext'
import stateStrs from '../formStates'

const withFormStateHoc = Observer => {
  return function withFormStateHoc({ ...rest }) {
    return (
      <FormContext.Consumer>
        {form => {
          if (!form) {
            return null
          }
          return <Observer form={form} stateStrs={stateStrs} {...rest} />
        }}
      </FormContext.Consumer>
    )
  }
}

export default withFormStateHoc
