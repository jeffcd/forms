const validatorFunctions = {
  required: (value, required) => required && !!value.length,
  maxLength: (value, maxLength) => value.length <= maxLength,
  minLength: (value, minLength) => value.length >= minLength
}

const validateField = field => {
  const errors = []
  Object.keys(field.validators).forEach(validator => {
    if (
      !validatorFunctions[validator](field.value, field.validators[validator])
    ) {
      errors.push(validator)
    }
  })
  return errors
}

export default validateField
