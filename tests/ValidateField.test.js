import validateField, {
  registerValidators,
  validatorFunctions
} from '../src/validateField'

test('Validate: Required', () => {
  const field = {
    name: 'First Name',
    value: '',
    errors: [],
    validators: {
      required: true
    }
  }

  expect(validateField(field)).toEqual(expect.arrayContaining(['required']))
  field.value = 'Jeff'
  expect(validateField(field)).toEqual(expect.arrayContaining([]))
})

test('Validate: Max Length', () => {
  const field = {
    name: 'First Name',
    value: 'Jeff Decker',
    errors: [],
    validators: {
      maxLength: 5
    }
  }

  expect(validateField(field)).toEqual(expect.arrayContaining(['maxLength']))
  field.value = 'Jeff'
  expect(validateField(field)).toEqual(expect.arrayContaining([]))
})

test('Validate: Min Length', () => {
  const field = {
    name: 'First Name',
    value: 'J',
    errors: [],
    validators: {
      minLength: 5
    }
  }

  expect(validateField(field)).toEqual(expect.arrayContaining(['minLength']))
  field.value = 'Jeff Decker'
  expect(validateField(field)).toEqual(expect.arrayContaining([]))
})

test('Validate: Max', () => {
  const field = {
    name: 'Age',
    value: '21',
    errors: [],
    validators: {
      max: 18
    }
  }

  expect(validateField(field)).toEqual(expect.arrayContaining(['max']))
  field.value = '16'
  expect(validateField(field)).toEqual(expect.arrayContaining([]))
})

test('Validate: Min', () => {
  const field = {
    name: 'Age',
    value: '21',
    errors: [],
    validators: {
      min: 25
    }
  }

  expect(validateField(field)).toEqual(expect.arrayContaining(['min']))
  field.value = '32'
  expect(validateField(field)).toEqual(expect.arrayContaining([]))
})

test('Validate: Match', () => {
  const field = {
    name: 'First Name',
    value: 'J',
    errors: [],
    validators: {
      match: '^Jeff'
    }
  }

  expect(validateField(field)).toEqual(expect.arrayContaining(['match']))
  field.value = 'Jeff Decker'
  expect(validateField(field)).toEqual(expect.arrayContaining([]))
})

test('Register custom validator', () => {
  const customValidatorFunctions = {
    required: ({ value }, required) => required && !!value.length,
    between20and30: ({ value }) => value >= 20 && value <= 30
  }
  registerValidators(customValidatorFunctions)
  expect(validatorFunctions.required).toBe(customValidatorFunctions.required)
  expect(validatorFunctions.between20and30).toBe(
    customValidatorFunctions.between20and30
  )
})
