const stateStrs = {
  submit: 'Saving...',
  error: 'There are errors...',
  dirty: 'Unsaved changes...',
  pristine: ''
}

const registerStateStrs = customStateStrs => {
  Object.keys(customStateStrs).forEach(name => {
    stateStrs[name] = customStateStrs[name]
  })
}

export { registerStateStrs }

export default stateStrs
