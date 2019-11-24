import React, { useContext, useEffect } from 'react'
import FormContext from './FormContext'
import validateField, { validatorFunctions } from './validateField'
import messages from './messages'
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

const asFieldHoc = Field => {
  return function asFieldHoc({ ...rest }) {
    const form = useContext(FormContext)
    const { name, initialValue, convertTo } = rest
    const handleChange = e => {
      const field = form.fields[name]
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
        value: initialValue || '',
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
          const field = form.fields[name]
          if (!field) {
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
      </FormContext.Consumer>
    )
  }
}

export default asFieldHoc
