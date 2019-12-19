import React from 'react'
import FormContext from '../FormContext'
import ListContext from '../ListContext'
import stateStrs from '../formStates'

const withFormStateHoc = Observer => {
  return function withFormStateHoc({ ...rest }) {
    return (
      <FormContext.Consumer>
        {form => {
          return (
            <ListContext.Consumer>
              {listInfo => {
                return (
                  <Observer
                    form={form}
                    stateStrs={stateStrs}
                    listInfo={listInfo}
                    {...rest}
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

export default withFormStateHoc
