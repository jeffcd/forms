import React from 'react'
import FormContext from '../FormContext'
import ListContext from '../ListContext'

const withListActionsHoc = Component => {
  return function withListActionsHoc({ ...rest }) {
    return (
      <FormContext.Consumer>
        {form => {
          if (!form) {
            return null
          }
          return (
            <ListContext.Consumer>
              {listInfo => {
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
                  <Component
                    listActions={form.listActions}
                    {...rest}
                    {...listProps}
                  />
                )
              }}
            </ListContext.Consumer>
          )
        }}
      </FormContext.Consumer>
    )
  }
}

export default withListActionsHoc
