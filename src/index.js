import React, { useState } from 'react'
import set from 'lodash/set'
import FormContext from './FormContext'
import validateField, { registerValidators } from './validateField'
import { registerMessages } from './messages'
import { registerStateStrs } from './formStates'

let formSaved = JSON.parse(sessionStorage.getItem('formContext'))
if (!formSaved) {
  formSaved = {
    fields: {},
    errorCount: 0,
    state: 'pristine'
  }
}

const convertToData = form => {
  const body = {}
  const convertArrToDataArr = arr => {
    const dataArr = []
    arr.forEach((fields, i) => {
      dataArr[i] = convertToData({ fields })
    })
    return dataArr
  }
  Object.keys(form.fields).forEach(name => {
    const field = form.fields[name]
    const value = field.value
    if (Array.isArray(value)) {
      body[name] = convertArrToDataArr(value)
    } else {
      if (field.convertTo) {
        body[name] = value[field.convertTo.fn](field.convertTo.sep)
      } else {
        body[name] = value
      }
    }
  })
  return body
}

const error = (type, setForm, form) => {
  form.state = `error_${type}`
  setForm({ ...form })
}

const clear = (type = '', setForm, form) => {
  Object.keys(form.fields).forEach(name => {
    const field = form.fields[name]
    field.value = ''
    field.errors = []
  })
  const state = type ? `pristine_${type}` : 'pristine'
  form.state = state
  form.errorCount = 0
  setForm({ ...form })
}

const pristine = (type = '', setForm, form) => {
  Object.keys(form.fields).forEach(name => {
    const field = form.fields[name]
    field.errors = []
  })
  const state = type ? `pristine_${type}` : 'pristine'
  form.state = state
  form.errorCount = 0
  setForm({ ...form })
}

const Form = ({
  children,
  onSubmit,
  noValidate = true,
  autoComplete = 'off',
  validators = {},
  messages = {},
  stateStrs = {}
}) => {
  const [form, setForm] = useState(formSaved)

  const updateFormField = (updatedField, isUser = true) => {
    set(form.fields, updatedField.name, updatedField)
    if (isUser) {
      form.state = 'dirty'
    }
    setForm({ ...form })
  }

  const validateForm = e => {
    if (form.submit) {
      e.preventDefault()
      console.warn('validateForm: form is already in submission state')
      return
    }
    let errorCount = 0
    Object.keys(form.fields).forEach(field => {
      const errors = validateField(form.fields[field])
      form.fields[field].errors = errors
      errorCount += errors.length
    })
    form.errorCount = errorCount
    form.state = errorCount ? 'error' : 'submit'
    setForm({ ...form })
    if (errorCount === 0) {
      onSubmit(e, convertToData(form), {
        error: type => error(type, setForm, form),
        clear: type => clear(type, setForm, form),
        pristine: type => pristine(type, setForm, form)
      })
    }
  }

  registerValidators(validators)
  registerMessages(messages)
  registerStateStrs(stateStrs)

  return (
    <FormContext.Provider value={{ ...form, setFormField: updateFormField }}>
      <form
        onSubmit={e => validateForm(e)}
        noValidate={noValidate}
        autoComplete={autoComplete}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form
