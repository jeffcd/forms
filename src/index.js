import React, { useState } from 'react'
import set from 'lodash/set'
import get from 'lodash/get'
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
    if (field.isVisible === false) {
      // do nothing
    } else if (Array.isArray(value)) {
      body[name] = convertArrToDataArr(value)
    } else if (typeof value === 'undefined') {
      if (Array.isArray(field)) {
        body[name] = convertArrToDataArr(field)
      } else {
        body[name] = convertToData({ fields: field })
      }
    } else {
      if (field.convertTo) {
        const fn = field.convertTo.fn
        if (typeof fn === 'function') {
          body[name] = fn(value)
        } else {
          body[name] = value[field.convertTo.fn](field.convertTo.sep)
        }
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

const traverseForm = form => handler => {
  const traverseArr = arr => {
    arr.forEach(fields => {
      traverseForm({ fields })(handler)
    })
  }
  Object.keys(form.fields).forEach(name => {
    const field = form.fields[name]
    const value = field.value
    if (field.isVisible === false) {
      // do nothing
    } else if (Array.isArray(value)) {
      traverseArr(value)
    } else if (typeof value === 'undefined') {
      if (Array.isArray(field)) {
        traverseArr(field)
      } else {
        traverseForm({ fields: field })(handler)
      }
    } else {
      handler(field)
    }
  })
}

const clear = (type = '', setForm, form) => {
  traverseForm(form)(field => {
    field.value = ''
    field.errors = []
  })
  const state = type ? `pristine_${type}` : 'pristine'
  form.state = state
  form.errorCount = 0
  setForm({ ...form })
}

const pristine = (type = '', setForm, form) => {
  traverseForm(form)(field => {
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

  const updateFormField = (updatedField, path, isUser = true) => {
    set(form.fields, path, updatedField)
    if (isUser) {
      form.state = 'dirty'
    }
    setForm({ ...form })
  }

  const addItemToList = to => {
    const field = get(form.fields, to)
    if (
      field.validators.maxLength &&
      field.value.length < field.validators.maxLength
    ) {
      field.value.push({})
      updateFormField(field, to)
    }
  }

  const removeItemFromList = (from, index) => {
    const field = get(form.fields, from)
    if (
      field.validators.minLength &&
      field.value.length > field.validators.minLength
    ) {
      field.value.splice(index, 1)
      updateFormField(field, from)
    }
  }

  const listActions = {
    addItemToList,
    removeItemFromList
  }

  const validateForm = e => {
    if (form.submit) {
      e.preventDefault()
      console.warn('validateForm: form is already in submission state')
      return
    }
    let errorCount = 0
    traverseForm(form)(field => {
      const errors = validateField(field)
      field.errors = errors
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
    } else {
      e.preventDefault()
    }
  }

  registerValidators(validators)
  registerMessages(messages)
  registerStateStrs(stateStrs)

  return (
    <FormContext.Provider
      value={{ ...form, setFormField: updateFormField, listActions }}
    >
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
