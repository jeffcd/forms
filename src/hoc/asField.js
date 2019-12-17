import React from 'react'
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

const getErrorMessages = ({ props, field }) => {
  return field.errors.map(error => {
    let message = errorMessages[error]
    if (props.messages && props.messages[error]) {
      message = props.messages[error]
    }
    return message
      .replace('%name%', props.label)
      .replace('%param%', props[error])
  })
}

const getInitialValue = (
  fullName,
  name,
  Field,
  { minLength = 0 },
  data,
  initialValue
) => {
  const lookupPath = fullName.replace(/\.value/g, '')
  if (Field.type === 'list') {
    const dataList = get(data, lookupPath, [])
    const size = Math.max(dataList.length, parseInt(minLength))
    return Array(size)
  }
  return get(data, lookupPath, initialValue || '')
}

const asFieldHoc = Field => {
  return function asFieldHoc({ ...rest }) {
    return (
      <ListContext.Consumer>
        {listInfo => {
          const { name, initialValue, convertTo } = rest
          const fullName = listInfo
            ? `${listInfo.name}.value[${listInfo.i}].${name}`
            : name

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
            <FormContext.Consumer>
              {form => {
                const field = get(form.fields, fullName)
                if (!field) {
                  const field = {
                    name,
                    value: getInitialValue(
                      fullName,
                      name,
                      Field,
                      rest,
                      form.data,
                      initialValue
                    ),
                    validators: getValidators(rest),
                    convertTo,
                    errors: []
                  }
                  const isUser = false
                  form.setFormField(field, fullName, isUser)

                  return null
                }

                return (
                  <VisibilityContext.Consumer>
                    {visibility => {
                      if (field.isVisible !== visibility.isVisible) {
                        const isUser = false
                        field.isVisible = visibility.isVisible
                        form.setFormField({ ...field }, fullName, isUser)
                      }
                      if (visibility.isVisible === false) {
                        return null
                      }

                      const handleChange = e => {
                        const field = get(form.fields, fullName)
                        const newField = {
                          ...field,
                          value: e.target.value
                        }
                        const errors = validateField(newField)
                        newField.errors = errors
                        form.setFormField(newField, fullName)
                      }
                      return (
                        <Field
                          onChange={handleChange}
                          value={field.value}
                          errors={getErrorMessages({ props: rest, field })}
                          {...rest}
                          {...listProps}
                        />
                      )
                    }}
                  </VisibilityContext.Consumer>
                )
              }}
            </FormContext.Consumer>
          )
        }}
      </ListContext.Consumer>
    )
  }
}

export default asFieldHoc
