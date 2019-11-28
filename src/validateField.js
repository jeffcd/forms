const validatorFunctions = {
  required: ({ value }, required) => required && !!value.length,
  maxLength: ({ value }, maxLength) => value.length <= maxLength,
  minLength: ({ value }, minLength) => value.length >= minLength,
  max: ({ value }, max) => parseInt(value) <= parseInt(max),
  min: ({ value }, min) => parseInt(value) >= parseInt(min),
  match: ({ value }, regexp) => new RegExp(regexp).test(value)
}

const validateField = field => {
  const errors = []
  Object.keys(field.validators).forEach(validator => {
    if (
      !validatorFunctions[validator](
        { value: field.value },
        field.validators[validator]
      )
    ) {
      errors.push(validator)
    }
  })
  return errors
}

const registerValidators = validators => {
  Object.keys(validators).forEach(name => {
    validatorFunctions[name] = validators[name]
  })
}

export { registerValidators }
export { validatorFunctions }

export default validateField
