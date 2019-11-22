import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { default as MButton } from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const Button = ({ text, type, onClick }) => {
  const classes = useStyles()

  return (
    <MButton
      type={type}
      size="large"
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </MButton>
  )
}

export default Button
