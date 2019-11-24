# Glue It - Forms &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jeffcd/forms/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@glueit/forms.svg?style=flat)](https://www.npmjs.com/package/@glueit/forms) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jeffcd/forms/blob/master/CONTRIBUTING.md)

Build React forms declaratively.

- Custom validators
- Custom fields
- Hooks based state management

## Prerequisites

Forms is built on top of React. At the minimum you will need:

- [node.js 10+](https://nodejs.org)
- [React 16.8+](http://reactjs.org/)

## Installation

```
$ npm i @glueit/forms
```

## Sample Forms

#### Coming soon...

## Custom Validators & Messages

```
import React from 'react'
import Form, {
  Button,
  Input
} from '@glueit/forms'

const range20to30 = ({ value }) => {
  return value >= 20 && value <= 30
}

const messages = {
  range20to30 = 'You must be between 20 and 30 years of age to participate.'
}

const handleSubmit = (e, form, actions) => {
  // Do whatever you need with the form here.
  actions.clear()
}

const function AgeForm = () => (
  <Form messages={messages} validators={{ range20to30 }} onSubmit={(e, form, acitons) => handleSubmit(e, form, actions)}>
    <Input
      name="age"
      label="Age"
      helperText="What is your age?"
      required
      range20to30
    />
    <Button text="Submit" type="submit" />
  </Form>
)

export default AgeForm
```

## Custom Fields

Custom fields are created using the `asField` higher order component.

```
import React from 'react'
import Form, {
  Button,
  asField
} from '@glueit/forms'

const CustomInput = asField({
  onChange,
  onBlur = () => {},
  name,
  value,
  errors,
  label,
  helperText,
  required = false
}) => {
  return (
    <input
      id={name}
      value={value}
      onChange={e => onChange(e)}
      onBlur={e => onBlur(e)}
      label={label}
      required={required}
    />
  )
})

const function AgeForm = () => (
  <Form onSubmit={(e, form, acitons) => handleSubmit(e, form, actions)}>
    <CustomInput
      name="age"
      label="Age"
      helperText="What is your age?"
      required
      range20to30
    />
    <Button text="Submit" type="submit" />
  </Form>
)

export default AgeForm


```

## State Management

State is handled using the context hook. You can access the form state from `onSubmit` property on `Form`.
