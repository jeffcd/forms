import React, { useState } from 'react'
import FormContext from './FormContext'
import validateField, { registerValidators } from './validateField'
import { registerMessages } from './messages'

let formSaved = JSON.parse(sessionStorage.getItem('formContext'))
if (!formSaved) {
  formSaved = {
    fields: {},
    errorCount: 0,
    state: 'pristine'
  }
}

const setFieldList = (body, name, value) => {
  const [listName, , fieldName, index] = name.split('-')
  if (!body[listName]) {
    body[listName] = []
  }
  if (!body[listName][index]) {
    body[listName][index] = {}
  }
  body[listName][index][fieldName] = value
}

const isPartOfList = name => /^.*--.*/.test(name)

const convertToData = form => {
  const body = {}
  Object.keys(form.fields).forEach(name => {
    const field = form.fields[name]
    if (isPartOfList(name)) {
      setFieldList(body, name, field.value)
    } else {
      if (field.convertTo) {
        body[name] = field.value[field.convertTo.fn](field.convertTo.sep)
      } else {
        body[name] = field.value
      }
    }
  })
  return body
}

const clear = (setForm, form) => {
  Object.keys(form.fields).forEach(name => {
    const field = form.fields[name]
    field.value = ''
    field.errors = []
  })
  form.state = 'pristine'
  form.errorCount = 0
  setForm({ ...form })
}

const Form = ({
  children,
  onSubmit,
  noValidate = true,
  autoComplete = 'off',
  validators = {},
  messages = {}
}) => {
  const [form, setForm] = useState(formSaved)

  const updateFormField = (updatedField, isUser = true) => {
    // window.sessionStorage.setItem('formContext', JSON.stringify(newForm))
    form.fields[updatedField.name] = updatedField
    if (isUser) {
      form.state = 'dirty'
    }
    setForm({ ...form })
  }

  const validateForm = e => {
    e.preventDefault()
    if (form.submit) {
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
      setTimeout(() => {
        onSubmit(e, convertToData(form), {
          clear: () => clear(setForm, form)
        })
      }, 0)
    }
  }

  //useEffect(() => {
  registerValidators(validators)
  registerMessages(messages)
  //}, [ validators ])

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
