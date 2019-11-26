import React, { useContext, useEffect } from 'react'
import get from 'lodash/get'
import FormContext from '../FormContext'
import VisibilityContext from '../VisibilityContext'
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
    const { name, initialValue, convertTo } = rest
    const handleChange = e => {
      const field = get(form.fields, name)
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
        name,
        value: initialValue || getInitialValue(Field, rest),
        validators: getValidators(rest),
        convertTo,
        errors: []
      }
      const isUser = false
      form.setFormField(field, isUser)
    }, [rest.name])

    return (
      <FormContext.Consumer>
        {form => {
          const field = get(form.fields, name)
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
                  <Field
                    onChange={handleChange}
                    value={field.value}
                    errors={getErrorMessages(field.errors)}
                    {...rest}
                  />
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
