import React from 'react'
import List from '../../src/fields/List'
import SimpleStates from '../../src/observers/SimpleStates'
import asField from '../../src/asFieldHoc'
import withFormState from '../../src/withFormStateHoc'
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
          <Input name="employer" label="Employer" />
          <Input name="title" label="Your Title" />
          <Input name="duration" label="Years / months duration" />
          <h6>Your Managers</h6>
          <List name="managers" minSize="1" maxSize="2">
            <Input name="name" label="Manager" />
          </List>
        </List>
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
