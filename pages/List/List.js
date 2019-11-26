import React from 'react'
import List from '../../src/fields/List'
import SimpleStates from '../../src/observers/SimpleStates'
import asField from '../../src/hoc/asField'
import withFormState from '../../src/hoc/withFormState'
import withListActions from '../../src/hoc/withListActions'
import Form from '../../src'

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

const Button = withFormState(({ text, type, onClick, form }) => {
  const disabled = form.state === 'submit'

  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
})

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

const PList = () => {
  const handleSubmit = async (e, body, actions) => {
    e.preventDefault()
    console.log(body)
    console.log(actions)
    // This is just for example...
    const result = await new Promise(res => {
      setTimeout(() => {
        // actions.pristine('success')
        //actions.clear('success')
        actions.error('server')
        res('done')
      }, 3000)
    })
    console.log(result)
  }
  return (
    <Form onSubmit={(e, form, actions) => handleSubmit(e, form, actions)}>
      <div>
        <Input name="name" label="Your Name" />
      </div>
      <div>
        <Input name="age" label="Your Age" />
      </div>

      <h3>Your Employment History</h3>
      <div>
        <List minSize="2" maxSize="5" name="employers">
          <h5>Employer Entry</h5>
          <RemoveListItem from text="Remove Employer" />
          <div>
            <Input name="employer" label="Employer" required />
            <Input name="title" label="Your Title" required />
            <Input name="duration" label="Years / months duration" />
          </div>
          <h6>Your Managers</h6>
          <List name="managers" minSize="1" maxSize="2">
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

      <div>
        <br />
        <Button text="Submit" type="submit" />
        <SimpleStates />
      </div>
    </Form>
  )
}

export default PList
