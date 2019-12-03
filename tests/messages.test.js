import messages, { registerMessages } from '../src/messages'

test('Messages get and set', () => {
  const customMessages = {
    required: 'Your field is required.'
  }
  registerMessages(customMessages)
  expect(messages.required).toBe(customMessages.required)
})
