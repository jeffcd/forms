# Glue It - Forms &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jeffcd/forms/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@glueit/forms) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jeffcd/forms/blob/master/CONTRIBUTING.md)

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

<Form messages={messages} validators={{ range20to30 }} onSubmit={(e, form, acitons) => handleSubmit(e, form, actions)}>
  <Input
    name="age"
    label="Age"
    helperText="What is your age?"
    required
    range20to30
  />
</Form>
```

## Custom Fields

## State Management

