import React from 'react'
import Form from '../../src'
import asField from '../../src/hoc/asField'
import withListActions from '../../src/hoc/withListActions'
import withFormState from '../../src/hoc/withFormState'
import List from '../../src/fields/List'
import Scope from '../../src/observers/Scope'

const Button = withFormState(({ id, text, type, onClick, form }) => {
  const disabled = form.state === 'submit'

  return (
    <button id={id} name={id} type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
})

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

const AddListItem = withListActions(({ id, text, to, listActions }) => {
  return (
    <Button
      id={`add-${to}`}
      text={text}
      type="button"
      onClick={() => listActions.addItemToList(to)}
    />
  )
})

it('Form: Scope with List', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
      }}
    >
      <Scope path="users">
        <List name="games" minLength="1">
          <Input name="name" />
        </List>
        <AddListItem to="games" text="Add Game" />
        <Input id="firstName" name="firstName" required />
        <Scope path="skills">
          <Input id="first" name="first" />
          <Input id="second" name="second" />
        </Scope>
      </Scope>
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
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})

it('Form: Scope with List', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
      }}
    >
      <Scope path="users">
        <Input id="firstName" name="firstName" required />
        <Scope path="skills">
          <Input id="first" name="first" />
          <Input id="second" name="second" />
        </Scope>
      </Scope>
      <Scope>
        <Input id="game" />
      </Scope>
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
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)
})
