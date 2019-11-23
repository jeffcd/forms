import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import withFormStateHoc from '../withFormStateHoc'

const stateStrs = {
  submit: 'Saving...',
  error: 'There are errors...',
  dirty: 'Unsaved changes...',
  pristine: ''
}

const useStyles = makeStyles(theme => ({
  SimpleStates: {
    marginTop: '16px',
    paddingLeft: theme.spacing(1)
  }
}))

const SimpleStates = ({ form }) => {
  const classes = useStyles()
  return (
    <Typography variant="body1" className={classes.SimpleStates}>
      {stateStrs[form.state]}
    </Typography>
  )
}

export default withFormStateHoc(SimpleStates)
