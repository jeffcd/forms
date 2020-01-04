import React from 'react'
import Form from '../../src'
import asField from '../../src/hoc/asField'
import SetField from '../../src/fields/SetField'

const Input = asField(
  ({
    onChange,
    onBlur = () => {},
    name,
    id,
    value,
    errors,
    label,
    helperText,
    required = false
  }) => {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <br />
        <input
          id={`input-${id}`}
          name={name}
          value={value}
          onChange={e => onChange(e)}
          onBlur={e => onBlur(e)}
          label={label}
          required={required}
        />
        <span>{errors.length ? errors[0] : helperText}</span>
      </div>
    )
  }
)

it('Form: Set Field', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
      }}
    >
      <Input id="firstName" name="firstName" required />
      <SetField name="firstName" setValue="Jeff" />
      <SetField name="firstName" setValue="Jeff" />
      <button type="submit" id="submit-button">
        Submit
      </button>
    </Form>
  )
  const tree = mount(form)

  expect(tree.html()).toMatchSnapshot()

  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})
