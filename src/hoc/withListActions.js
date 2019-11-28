import React from 'react'
import get from 'lodash/get'
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
                const to = rest.to
                const from = rest.from
                if (listInfo) {
                  const { name, i } = listInfo
                  if (to) {
                    listProps.to = `${name}.value[${i}].${to}`

                    const field = get(form.fields, listProps.to)
                    const listInfo = field.validators
                    const length = field.value.length
                    if (
                      to &&
                      listInfo.maxLength &&
                      length >= listInfo.maxLength
                    ) {
                      return null
                    }
                  }
                  if (from) {
                    listProps.from = `${name}`
                    listProps.index = i
                    if (
                      listInfo.minLength &&
                      listInfo.length <= listInfo.minLength
                    ) {
                      return null
                    }
                  }
                } else {
                  const field = get(form.fields, to)
                  const listInfo = field.validators
                  const length = field.value.length
                  if (
                    to &&
                    listInfo.maxLength &&
                    length >= listInfo.maxLength
                  ) {
                    return null
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
