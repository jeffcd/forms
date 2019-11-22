import React, { useState } from 'react'
import FormContext from './FormContext'
import validateField from './validateField'

let formSaved = JSON.parse(sessionStorage.getItem('formContext'))
if (!formSaved) {
  formSaved = {
    fields: {},
    errorCount: 0
  }
}

const setFieldList = (body, name, value) => {
  const [listName, _, fieldName, index] = name.split('-')
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

const Form = ({
  children,
  onSubmit,
  noValidate = true,
  autoComplete = 'off'
}) => {
  const [form, setForm] = useState(formSaved)

  const updateFormField = updatedField => {
    // window.sessionStorage.setItem('formContext', JSON.stringify(newForm))
    form.fields[updatedField.name] = updatedField
    setForm(form)
  }

  const validateForm = e => {
    e.preventDefault()
    let errorCount = 0
    Object.keys(form.fields).forEach(field => {
      const errors = validateField(form.fields[field])
      form.fields[field].errors = errors
      errorCount += errors.length
    })
    form.errorCount = errorCount
    setForm(form)
    if (errorCount === 0) {
      onSubmit(e, convertToData(form))
    }
  }

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
