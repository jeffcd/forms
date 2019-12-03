import React from 'react'
import Form from '../../src'
import asField from '../../src/hoc/asField'
import SimpleStates from '../../src/observers/SimpleStates'

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

it('Form: Renders Empty', () => {
  const handleSubmit = jest.fn()
  const form = (
    <Form
      onSubmit={(e, form, actions) => {
        console.log(form)
        handleSubmit(e, form, actions)
      }}
    >
      <Input name="firstName" required />
      <SimpleStates />
      <button type="submit" id="submit-button">
        Submit
      </button>
    </Form>
  )
  const tree = mount(form)

  expect(tree.html()).toMatchSnapshot()
  tree.find('form').simulate('submit')
  tree.find('#submit-button').simulate('click')
  expect(tree.html()).toMatchSnapshot()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
})
