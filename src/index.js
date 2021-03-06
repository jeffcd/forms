import React, { useState } from 'react'
import set from 'lodash/set'
import get from 'lodash/get'
import update from 'immutability-helper'
import FormContext from './FormContext'
import validateField, { registerValidators } from './validateField'
import { registerMessages } from './messages'
import { registerStateStrs } from './formStates'

const baseForm = {
  fields: {},
  errorCount: 0,
  state: 'pristine'
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

const updates = (fieldUpdates = [], setForm, form) => {
  fieldUpdates.forEach(fieldUpdate => {
    set(form.fields, `${fieldUpdate.path}.value`, fieldUpdate.value)
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

const saving = (type = '', setForm, form) => {
  const state = type ? `saving_${type}` : 'saving'
  form.state = state
  setForm({ ...form })
}

const saved = (type = '', setForm, form) => {
  if (!/^saving/.test(form.state)) {
    return // If changes have been made while saving
  }
  const state = type ? `saved_${type}` : 'saved'
  form.state = state
  setForm({ ...form })
}

const Form = ({
  children,
  onSubmit,
  noValidate = true,
  autoComplete = 'off',
  validators = {},
  messages = {},
  stateStrs = {},
  data = {},
  apiHandlerReference
}) => {
  const [form, setForm] = useState({ ...baseForm, ...{ fields: {} } })

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
      field.value.length >= field.validators.maxLength
    ) {
      return
    }
    field.value.push({})
    updateFormField(field, to)
  }

  const removeItemFromList = (from, index) => {
    const field = get(form.fields, from)
    if (
      field.validators.minLength &&
      field.value.length <= field.validators.minLength
    ) {
      return
    }
    field.value.splice(index, 1)
    updateFormField(field, from)
  }

  const moveListItem = (listPath, fromIndex, toIndex) => {
    const field = get(form.fields, listPath)
    const fromItem = field.value[fromIndex]
    field.value = update(field.value, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, fromItem]
      ]
    })
    updateFormField(field, listPath)
  }

  const listActions = {
    addItemToList,
    removeItemFromList,
    moveListItem
  }

  const handleSubmit = e => {
    if (form.submit) {
      e.preventDefault()
      console.warn('validateForm: form is already in submission state')
      return
    }
    let errorCount = 0
    traverseForm(form)(field => {
      const errors = validateField({ field, fields: form.fields })
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
        pristine: type => pristine(type, setForm, form),
        saved: type => saved(type, setForm, form),
        updates: fieldUpdates => updates(fieldUpdates, setForm, form)
      })
    } else {
      e.preventDefault()
    }
  }

  const validateFields = path => {
    const subForm = { fields: get(form.fields, path, {}) }
    let isValid = true
    traverseForm(subForm)(field => {
      const errors = validateField({ field, fields: form.fields })
      field.errors = errors
      if (errors.length) {
        isValid = false
      }
    })
    setForm({ ...form })
    return isValid
  }

  if (apiHandlerReference) {
    apiHandlerReference.getData = () => convertToData(form)
    apiHandlerReference.isDirty = () => form.state === 'dirty'
    apiHandlerReference.error = type => error(type, setForm, form)
    apiHandlerReference.clear = type => clear(type, setForm, form)
    apiHandlerReference.pristine = type => pristine(type, setForm, form)
    apiHandlerReference.saving = type => saving(type, setForm, form)
    apiHandlerReference.saved = type => saved(type, setForm, form)
    apiHandlerReference.updates = fieldUpdates =>
      updates(fieldUpdates, setForm, form)
  }

  registerValidators(validators)
  registerMessages(messages)
  registerStateStrs(stateStrs)

  return (
    <FormContext.Provider
      value={{
        ...form,
        data,
        setFormField: updateFormField,
        listActions,
        validateFields
      }}
    >
      <form
        onSubmit={e => handleSubmit(e)}
        noValidate={noValidate}
        autoComplete={autoComplete}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form
