import React, { useContext, useEffect } from 'react'
import get from 'lodash/get'
import FormContext from '../FormContext'
import VisibilityContext from '../VisibilityContext'
import ListContext from '../ListContext'
import validateField, { validatorFunctions } from '../validateField'
import messages from '../messages'
const validators = validatorFunctions

const getValidators = props => {
  const fieldValidators = {}
  Object.keys(props).forEach(name => {
    if (validators[name]) {
      fieldValidators[name] = props[name]
    }
  })
  return fieldValidators
}

const errorMessages = messages

const getErrorMessages = errors => errors.map(error => errorMessages[error])

const getInitialValue = (Field, { minSize = 0 }) => {
  if (Field.type === 'list') {
    const size = parseInt(minSize)
    return Array(size)
  }

  return ''
}

const asFieldHoc = Field => {
  return function asFieldHoc({ ...rest }) {
    const form = useContext(FormContext)
    const listInfo = useContext(ListContext)
    const { name, initialValue, convertTo } = rest
    const fullName = listInfo
      ? `${listInfo.name}.value[${listInfo.i}].${name}`
      : name
    const handleChange = e => {
      const field = get(form.fields, fullName)
      const newField = {
        ...field,
        value: e.target.value
      }
      const errors = validateField(newField)
      newField.errors = errors
      form.setFormField(newField)
    }
    useEffect(() => {
      const field = {
        name: fullName,
        value: initialValue || getInitialValue(Field, rest),
        validators: getValidators(rest),
        convertTo,
        errors: []
      }
      const isUser = false
      form.setFormField(field, isUser)
    }, [form.setField])

    return (
      <FormContext.Consumer>
        {form => {
          const field = get(form.fields, fullName)
          if (!field) {
            return null
          }
          return (
            <VisibilityContext.Consumer>
              {visibility => {
                if (visibility.isVisible === false) {
                  if (field.isVisible !== false) {
                    const isUser = false
                    field.isVisible = false
                    form.setFormField({ ...field }, isUser)
                  }
                  return null
                }
                return (
                  <ListContext.Consumer>
                    {listInfo => {
                      const listProps = {}
                      if (listInfo) {
                        const { i, name } = listInfo
                        const fullName = `${name}.value[${i}].${rest.name}`
                        const id = `${name}:${i}::${rest.name}:`
                        listProps.id = id
                        if (rest.name) {
                          listProps.name = fullName
                        }
                      }
                      return (
                        <Field
                          onChange={handleChange}
                          value={field.value}
                          errors={getErrorMessages(field.errors)}
                          {...rest}
                          {...listProps}
                        />
                      )
                    }}
                  </ListContext.Consumer>
                )
              }}
            </VisibilityContext.Consumer>
          )
        }}
      </FormContext.Consumer>
    )
  }
}

export default asFieldHoc
