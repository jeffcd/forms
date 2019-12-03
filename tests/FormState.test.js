import stateStrs, { registerStateStrs } from '../src/formStates'

test('States get and set', () => {
  const customStateStrs = {
    server_error: 'There was a server error.'
  }
  registerStateStrs(customStateStrs)
  expect(stateStrs.server_error).toBe(customStateStrs.server_error)
})
