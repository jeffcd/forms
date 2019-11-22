import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../../src/fields/Button'
import Select from '../../src/fields/Select'
import Tags from '../../src/fields/Tags'
import Input from '../../src/fields/Input'
import Code from '../../src/fields/Code'
import List from '../../src/fields/List'
import Form from '../../src'

const cardOptions = [
  {
    name: 'Push Ups',
    value: 'pushUps'
  },
  {
    name: 'Sit Ups',
    value: 'sitUps'
  }
]

const levelOptions = [
  {
    name: 'Beginner'
  },
  {
    name: 'Intermediate'
  },
  {
    name: 'Advanced'
  },
  {
    name: 'Pro'
  },
  {
    name: 'Guru'
  }
]

const assertOptions = [
  {
    name: 'equals'
  },
  {
    name: 'matches'
  }
]

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2),
    width: '100%'
  }
}))

const Home = ({ execAction }) => {
  const classes = useStyles()
  const handleSubmit = async (e, body) => {
    e.preventDefault()
    console.log(body)
    alert('Submission handler called.')
  }
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h4" component="h2">
            Sample Form
          </Typography>
        </Grid>
        <Form onSubmit={(e, form) => handleSubmit(e, form)}>
          <Grid container item spacing={1} xs={12} sm={8} md={8}>
            <Paper className={classes.card}>
              <Select
                name="component"
                label="Card Type"
                helperText="Different cards have different functionality."
                options={cardOptions}
                required
              />
              <Input
                name="name"
                label="Name"
                helperText="A clear/clean name for your card."
                required
                maxLength="32"
                minLength="4"
              />
              <Tags
                name="tags"
                label="Tags"
                initialValue="Javasript,Exercise"
                helperText="The relevant areas for you card to be found."
                required
                minLength="4"
                convertTo={{ fn: 'split', sep: ',' }}
              />
              <Select
                name="level"
                label="Level"
                helperText="How hard/complex is your card given the domain?"
                options={levelOptions}
                required
              />
              <Input
                name="description"
                label="Description"
                helperText="A concise description of your card."
                required
                minLength="12"
                maxLength="2048"
              />
            </Paper>

            <Paper className={classes.card}>
              <Input
                name="fnName"
                label="Entry/Main Function Name"
                helperText="The entry function for tests."
                required
                minLength="3"
                maxLength="12"
              />
              <Code
                height="200"
                name="code"
                label="Stub Code"
                helperText="The code that the user will modify to pass your tests."
                required
                minLength="24"
                maxLength="32768"
                initialValue={
                  "const helloWorld = () => {\n  return 'Hello world!'\n}"
                }
              />
              <List
                maxSize="5"
                name="tests"
                addLabel="Add Test"
                removeLabel="Remove"
              >
                <Select name="assert" label="Assert" options={assertOptions} />
                <Input name="string" label="String" />
              </List>
            </Paper>

            <Grid container item xs={12} spacing={3}>
              <Button text="Submit" type="submit" />
            </Grid>
          </Grid>
        </Form>
      </Grid>
    </Container>
  )
}

export default Home