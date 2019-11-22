import React, { useContext, useEffect } from 'react'
import FormContext from './FormContext'
import validateField from './validateField'

const validators = {
  required: true,
  maxLength: true,
  minLength: true
}

const getValidators = props => {
  const fieldValidators = {}
  Object.keys(props).forEach(name => {
    if (validators[name]) {
      fieldValidators[name] = props[name]
    }
  })
  return fieldValidators
}

const errorMessages = {
  required: 'The field is required.',
  maxLength: 'Exceeded the max length.',
  minLength: 'The min length is not met.'
}

const getErrorMessages = errors => errors.map(error => errorMessages[error])

export default Field => {
  return ({ ...rest }) => {
    const form = useContext(FormContext)
    const [state, setState] = React.useState({
      name: rest.name,
      value: rest.initialValue || '',
      validators: getValidators(rest),
      convertTo: rest.convertTo,
      errors: []
    })
    const handleChange = e => {
      const newState = {
        ...state,
        value: e.target.value
      }
      const errors = validateField(newState)
      newState.errors = errors
      setState(newState)
      form.setFormField(newState)
    }
    useEffect(() => {
      form.setFormField(state)
    }, [rest.name])
    return (
      <Field
        onChange={handleChange}
        value={state.value}
        errors={getErrorMessages(state.errors)}
        {...rest}
      />
    )
  }
}
