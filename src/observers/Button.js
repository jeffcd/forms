import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { default as MButton } from '@material-ui/core/Button'
import withFormStateHoc from '../hoc/withFormState'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const Button = ({ text, type, onClick, form }) => {
  const classes = useStyles()
  const disabled = form.state === 'submit'

  return (
    <MButton
      type={type}
      size="large"
      variant="contained"
      color="primary"
      disabled={disabled}
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </MButton>
  )
}

export default withFormStateHoc(Button)
