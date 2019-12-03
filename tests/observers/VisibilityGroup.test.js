import React from 'react'
import Form from '../../src'
import VisibilityGroup from '../../src/observers/VisibilityGroup'
import asField from '../../src/hoc/asField'
import SimpleStates from '../../src/observers/SimpleStates'

console.log(global.mount, mount)

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
      <div>
        <Input name="age" label="Your Age" min="16" max="65" />
      </div>

      <VisibilityGroup
        isVisible={form => form.fields.age && form.fields.age.value > 18}
      >
        <Input name="numberJobs" label="Number of jobs..." />
        <VisibilityGroup
          isVisible={form =>
            form.fields.numberJobs && form.fields.numberJobs.value > 5
          }
        >
          Wow that is a lot!
          <Input
            name="managerRating"
            label="What would the average manager give on you a scale 1-10?"
          />
        </VisibilityGroup>
      </VisibilityGroup>
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
