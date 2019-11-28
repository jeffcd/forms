const messages = {
  required: '%name% is required.',
  maxLength: '%name% exceeds the max length of %param%.',
  minLength: '%name% is less that the min length of %param%.',
  max: '%name% must be less than or equal to %param%.',
  min: '%name% must be greater or equal to %param%.',
  match: '%name% does not match the required expression %param%.'
}

const registerMessages = customMessages => {
  Object.keys(customMessages).forEach(name => {
    messages[name] = customMessages[name]
  })
}

export { registerMessages }

export default messages
