import React from 'react'
import Form from '../../src'
import List from '../../src/fields/List'
import asField from '../../src/hoc/asField'
import withListActions from '../../src/hoc/withListActions'
import withFormState from '../../src/hoc/withFormState'
import SimpleStates from '../../src/observers/SimpleStates'

const Button = withFormState(({ text, type, onClick, form }) => {
  const disabled = form.state === 'submit'

  return (
    <button type={type} disabled={disabled} onClick={onClick}>
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

const AddListItem = withListActions(({ text, to, listActions }) => {
  return (
    <Button
      text={text}
      type="button"
      onClick={() => listActions.addItemToList(to)}
    />
  )
})

const RemoveListItem = withListActions(({ text, from, index, listActions }) => {
  return (
    <Button
      text={text}
      type="button"
      onClick={() => listActions.removeItemFromList(from, index)}
    />
  )
})

it('Form: Renders Empty', () => {
  const handleSubmit = jest.fn()
  const form = (
    <Form
      onSubmit={(e, form, actions) => {
        console.log(form)
        handleSubmit(e, form, actions)
      }}
    >
      <h3>Your Employment History</h3>
      <div>
        <List minLength="2" maxLength="5" name="employers">
          <h5>Employer Entry</h5>
          <RemoveListItem from text="Remove Employer" />
          <div>
            <Input name="employer" label="Employer" required />
            <Input name="title" label="Your Title" required />
            <Input name="duration" label="Years / months duration" />
          </div>
          <h6>Your Managers</h6>
          <List name="managers" minLength="1" maxLength="2">
            <div>
              <Input name="name" label="Manager" />
            </div>
            <RemoveListItem from text="Remove Manager" />
          </List>
          <br />
          <br />
          <AddListItem to="managers" text="Add Manager" />
          <hr />
        </List>
        <div>
          <br />
          <AddListItem to="employers" text="Add Employer" />
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
  expect(handleSubmit).toHaveBeenCalledTimes(0)
})
