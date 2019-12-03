import React from 'react'
import Form from '../../src'
import VisibilityGroup from '../../src/observers/VisibilityGroup'
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

it('Form: Visibility Group', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
      }}
    >
      <div>
        <Input id="age" name="age" label="Your Age" min="16" max="65" />
      </div>

      <VisibilityGroup
        isVisible={form => form.fields.age && form.fields.age.value > 18}
      >
        <Input id="numberJobs" name="numberJobs" label="Number of jobs..." />
        <VisibilityGroup
          isVisible={form =>
            form.fields.numberJobs && form.fields.numberJobs.value > 5
          }
        >
          Wow that is a lot!
          <Input
            id="managerRating"
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

  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('#input-age')
    .simulate('change', { target: { name: 'age', value: '22' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)

  tree
    .find('#input-numberJobs')
    .simulate('change', { target: { name: 'numberJobs', value: '9' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(2)

  tree
    .find('#input-managerRating')
    .simulate('change', { target: { name: 'managerRating', value: '5' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(3)

  tree
    .find('#input-age')
    .simulate('change', { target: { name: 'age', value: '16' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(4)

  tree
    .find('#input-age')
    .simulate('change', { target: { name: 'age', value: '' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(4)
})
