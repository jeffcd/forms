import React from 'react'
import FormContext from '../FormContext'

const withListActionsHoc = Component => {
  return function withListActionsHoc({ ...rest }) {
    return (
      <FormContext.Consumer>
        {form => {
          if (!form) {
            return null
          }
          return <Component listActions={form.listActions} {...rest} />
        }}
      </FormContext.Consumer>
    )
  }
}

export default withListActionsHoc
