import React from 'react'
import FormContext from './FormContext'

const withFormStateHoc = Observer => {
  return function withFormStateHoc({ ...rest }) {
    return (
      <FormContext.Consumer>
        {form => {
          if (!form) {
            return null
          }
          return <Observer form={form} {...rest} />
        }}
      </FormContext.Consumer>
    )
  }
}

export default withFormStateHoc
