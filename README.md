# Glue It - Forms &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jeffcd/forms/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@glueit/forms.svg?style=flat)](https://www.npmjs.com/package/@glueit/forms) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jeffcd/forms/blob/master/CONTRIBUTING.md)

Build React forms declaratively.

Table of Contents
=================

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Sample forms](#sample-forms)
  * [Custom fields](#custom-fields)
  * [Custom observers](#custom-observers)
  * [Intuitive and simple submit handling](#submit-handling)
  * [Validators](#validators)
  * [Custom validators](#custom-validators)
  * [Custom messages](#custom-messages)
  * [Form states](#form-states)
  * [Hooks based state management](#state-management)

<a name="prerequisites"></a>
## Prerequisites

Forms is built on top of React. At the minimum you will need:

- [node.js 10+](https://nodejs.org)
- [React 16.8+](http://reactjs.org/)

<a name="installation"></a>
## Installation

```
$ npm i @glueit/forms
```

<a name="sample-forms"></a>
## Sample forms

You can see a sample form by cloning this repo and running these commands.

```
npm i
npm run start
```

Then open your browser at `localhost:3000`.

<a name="custom-fields"></a>
## Custom fields

Custom fields are created using the `asField` higher order component.

### Imports

```
import React from 'react'
import Form, {
  Form,
  asField
} from '@glueit/forms'
```

### The custom field

```
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
```

### The form

```
<Form>
  <CustomInput
    name="age"
    label="Age"
    helperText="What is your age?"
    required
  />
</Form>
```

<a name="custom-observers"></a>
## Custom observers

You can have observers in your `Form` that can then render based on the form state.

### Imports

```
import React from 'react'
import Form, {
  Form,
  withFormState
} from '@glueit/forms'
```

### The observer

```
const SimpleStates = withFormState(({ form, stateStrs }) => (
  <>
    The current state of the form is:
    <span>{stateStrs[form.state]}</span>
  </>
))
```

### The form

```
<Form>
  <SimpleStates />
</Form>
```

<a name="submit-handling"></a>
## Submit handling

Create your submit handler function.

```
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
```

Pass that function to your `Form`.

```
<Form onSubmit={(e, form, acitons) => handleSubmit(e, form, actions)}>
```

### Submit handler actions

Your submit handler gets three params.

- e: This is the synthetic event. Be sure to call `e.preventDefault()` if you want to handle to submission yourself.
- body: This is the data for your form in field name and value pair.
- actions: This is an object containing functions that you can call to update the form state when you are done.

- actions.clear([type]): This will clear the form and all data.
- actions.pristine([type]): This will leave the data in place but will set the form to pristine. Which means that there are no unsaved changes. It is useful if you are allowing ongoing edits with periodic saves.
- actions.error([type]): When an error occurs.

For all three of these `actions` you can specify your own type. For example, maybe you want to have `error_server` as shown above. In this case you would call with `actions.error('server')`.

<a name="validators"></a>
## Built-in validators

Apply any or all of the following to your fields as needed.

- required
- maxLength
- minLength

<a name="custom-validators"></a>
## Custom validators

Create a function that takes a value:

```
const range20to30 = ({ value }) => {
  return value >= 20 && value <= 30
}
```

Pass that function to your `Form` and apply that validator to a field.

```
<Form validators={{ range20to30 }}>
  <Input
    name="age"
    label="Age"
    helperText="What is your age?"
    required
    range20to30
  />
</Form>
```

<a name="custom-messages"></a>
## Custom messages

Create an object with your messages.

```
const messages = {
  range20to30 = 'You must be between 20 and 30 years of age to participate.'
}
```

Pass that object to your `Form`.

```
<Form messages={messages}>
```

<a name="form-states"></a>
## Form states

There are three states.

- pristine: A form that is pristine means that it has no modifications to its state. It can have data, but there are no \[unsaved\] modifications to its data.
- error: A form that has errors such as a required field or invalid data. A form can also be in error state if the submission fails on the server side such as a 500 error.
- dirty: A form that has unsaved changes.

You can override the messages for any of these or create custom states.

## Custom states

Create an object with your states. Make sure each state is prefixed with one of the allowed states.

- pristine\_
- error\_

```
const stateStrs = {
  pristine_success: 'Your submission was a success!',
  error_server: 'There was a server error.'
}
```

Pass that object to your `Form`.

```
<Form stateStrs={stateStrs}>
```

<a name="state-management"></a>
## State management

State is handled using the context hook. You can access the form state from `onSubmit` property on `Form` or using `observers` as described above.
