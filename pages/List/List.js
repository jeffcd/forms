import React from 'react'
import List from '../../src/fields/List'
import SimpleStates from '../../src/observers/SimpleStates'
import asField from '../../src/hoc/asField'
import withFormState from '../../src/hoc/withFormState'
import withListActions from '../../src/hoc/withListActions'
import VisibilityGroup from '../../src/observers/VisibilityGroup'
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

const nameMessages = {
  match: 'Your name must begin with Jeff.'
}

const stateStrs = {
  error_server: 'There was a server error.'
}

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
    <Form
      onSubmit={(e, form, actions) => handleSubmit(e, form, actions)}
      stateStrs={stateStrs}
    >
      <div>
        <Input
          name="name"
          label="Your Name"
          required
          match="^Jeff"
          messages={nameMessages}
        />
      </div>
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
      <Input
        name="references[0].name"
        label="Your Reference Name #1"
        required
      />
      <Input name="references[0].phone" label="Phone" required />
      <Input
        name="references[1].name"
        label="Your Reference Name #2"
        required
      />
      <Input name="references[1].phone" label="Phone" required />

      <Input name="skills[0].first" label="Your Best Skill" required />
      <Input name="skills.[1].second" label="Your Second Skill" required />

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

      <div>
        <br />
        <Button text="Submit" type="submit" />
        <SimpleStates />
      </div>
    </Form>
  )
}

export default PList
