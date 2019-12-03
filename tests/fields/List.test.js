import React from 'react'
import { act } from 'react-dom/test-utils'
import Form from '../../src'
import List from '../../src/fields/List'
import asField from '../../src/hoc/asField'
import withListActions from '../../src/hoc/withListActions'
import withFormState from '../../src/hoc/withFormState'
import SimpleStates from '../../src/observers/SimpleStates'

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

const RemoveListItem = withListActions(
  ({ id, text, from, index, listActions }) => {
    return (
      <Button
        id={`remove-${from}-${index}`}
        text={text}
        type="button"
        onClick={() => listActions.removeItemFromList(from, index)}
      />
    )
  }
)

it('Form: List Basic', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
      }}
    >
      <h3>Your Names (super simple and not efficient)</h3>
      <div>
        <List name="names">
          <Input id="names" name="names" label="Your names" />
        </List>
      </div>
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
  expect(submitSpy).toHaveBeenCalledTimes(1)
})

it('Form: List', () => {
  const submitSpy = jest.fn()
  let bodySpy = {}
  const form = (
    <Form
      onSubmit={(e, body, actions) => {
        bodySpy = body
        submitSpy()
      }}
    >
      <h3>Your Employment History</h3>
      <div>
        <List minLength="2" maxLength="5" name="employers">
          <h5>Employer Entry</h5>
          <RemoveListItem id="removeEmployer" from text="Remove Employer" />
          <div>
            <Input id="employer" name="employer" label="Employer" required />
            <Input id="title" name="title" label="Your Title" required />
            <Input
              id="duration"
              name="duration"
              label="Years / months duration"
            />
          </div>
          <h6>Your Managers</h6>
          <List name="managers" minLength="1" maxLength="2">
            &bull; Test
            <div>
              <Input name="name" label="Manager" />
            </div>
            <RemoveListItem id="removeManager" from text="Remove Manager" />
          </List>
          <br />
          <br />
          <AddListItem id="addManager" to="managers" text="Add Manager" />
          <hr />
        </List>
        <div>
          <br />
          <AddListItem id="addEmployer" to="employers" text="Add Employer" />
        </div>
      </div>
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
    .find('input[name="employers.value[0].employer"]')
    .simulate('change', {
      target: { name: 'employer', value: 'Think Big. Do.' }
    })
  tree
    .find('input[name="employers.value[0].title"]')
    .simulate('change', { target: { name: 'title', value: 'Head Geek' } })
  tree
    .find('input[name="employers.value[0].duration"]')
    .simulate('change', { target: { name: 'duration', value: '5' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(0)

  tree
    .find('input[name="employers.value[1].employer"]')
    .simulate('change', { target: { name: 'employer', value: 'Decker Labs' } })
  tree
    .find('input[name="employers.value[1].title"]')
    .simulate('change', { target: { name: 'title', value: 'Chief Officer' } })
  tree
    .find('input[name="employers.value[1].duration"]')
    .simulate('change', { target: { name: 'duration', value: '22' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)

  act(() => {
    tree
      .find('button[name="add-employers"]')
      .props()
      .onClick()
  })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(1)

  tree
    .find('input[name="employers.value[2].employer"]')
    .simulate('change', { target: { name: 'employer', value: 'Wonder Wall' } })
  tree
    .find('input[name="employers.value[2].title"]')
    .simulate('change', { target: { name: 'title', value: 'Day Dreamer' } })
  tree
    .find('input[name="employers.value[2].duration"]')
    .simulate('change', { target: { name: 'duration', value: '18' } })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(2)

  act(() => {
    tree
      .find('button[name="remove-employers-1"]')
      .props()
      .onClick()
  })
  tree.find('#submit-button').simulate('click')
  tree.find('form').simulate('submit')
  expect(tree.html()).toMatchSnapshot()
  expect(bodySpy).toMatchSnapshot()
  expect(submitSpy).toHaveBeenCalledTimes(3)

  act(() => {
    tree
      .find('button[name="add-employers"]')
      .props()
      .onClick()
    tree
      .find('button[name="add-employers"]')
      .props()
      .onClick()
    tree
      .find('button[name="add-employers"]')
      .props()
      .onClick()
  })
  expect(tree.html()).toMatchSnapshot()

  act(() => {
    tree
      .find('button[name="add-employers.value[0].managers"]')
      .props()
      .onClick()
  })
  expect(tree.html()).toMatchSnapshot()
})
