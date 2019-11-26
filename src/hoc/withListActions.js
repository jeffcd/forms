import React, { useContext } from 'react'
import FormContext from '../FormContext'
import ListContext from '../ListContext'

const withListActionsHoc = Component => {
  return function withListActionsHoc({ ...rest }) {
    const listInfo = useContext(ListContext)
    const listProps = {}
    if (listInfo) {
      const { name, i } = listInfo
      const to = rest.to
      const from = rest.from
      if (to) {
        listProps.to = `${name}.value[${i}].${to}`
      }
      if (from) {
        listProps.from = `${name}`
        listProps.index = i
      }
    }
    return (
      <FormContext.Consumer>
        {form => {
          if (!form) {
            return null
          }
          return (
            <Component
              listActions={form.listActions}
              {...rest}
              {...listProps}
            />
          )
        }}
      </FormContext.Consumer>
    )
  }
}

export default withListActionsHoc
