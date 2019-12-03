import React from 'react'
import Form from '../src'
import asField from '../src/hoc/asField'
import SimpleStates from '../src/observers/SimpleStates'

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

it('Form: Pristine', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
        actions.pristine()
      }}
    >
      <Input id="firstName" name="firstName" required />
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
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('#input-firstName')
    .simulate('change', { target: { name: 'firstName', value: 'Jeff' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})

it('Form: Error', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
        actions.error()
      }}
    >
      <Input id="firstName" name="firstName" required />
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
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('#input-firstName')
    .simulate('change', { target: { name: 'firstName', value: 'Jeff' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})

it('Form: Error: Custom', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
        actions.error('server')
      }}
      stateStrs={{
        error_server: 'There was a server error. Please try again later.'
      }}
    >
      <Input
        id="firstName"
        name="firstName"
        required
        match="^Jeff"
        messages={{ match: 'Your name must begin with Jeff.' }}
      />
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
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('#input-firstName')
    .simulate('change', { target: { name: 'firstName', value: 'J' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('#input-firstName')
    .simulate('change', { target: { name: 'firstName', value: 'Jeff' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(tree.html()).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})

it('Form: Clear', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
        actions.clear()
      }}
    >
      <Input id="firstName" name="firstName" required />
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
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('#input-firstName')
    .simulate('change', { target: { name: 'firstName', value: 'Jeff' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})

it('Form: Scope', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
        actions.clear()
      }}
    >
      <Input
        name="references[0].name"
        label="Your Reference Name #1"
        required
      />
      <Input name="references[0].phone" label="Phone" required />
      <Input name="references[1].name" label="Your Reference Name #2" />
      <Input name="references[1].phone" label="Phone" />

      <Input name="skills[0].first" label="Your Best Skill" required />
      <Input name="skills[1].second" label="Your Second Skill" />
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
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('input[name="references[0].name"]')
    .simulate('change', { target: { name: '', value: 'Jeff Decker' } })
  tree
    .find('input[name="references[0].phone"]')
    .simulate('change', { target: { name: '', value: '1234567890' } })
  tree
    .find('input[name="skills[0].first"]')
    .simulate('change', { target: { name: '', value: 'coding' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})
