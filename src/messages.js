const messages = {
  required: 'The field is required.',
  maxLength: 'Exceeded the max length.',
  minLength: 'The min length is not met.'
}

const registerMessages = customMessages => {
  Object.keys(customMessages).forEach(name => {
    messages[name] = customMessages[name]
  })
}

export { registerMessages }

export default messages
