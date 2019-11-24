import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import withFormStateHoc from '../withFormStateHoc'

const useStyles = makeStyles(theme => ({
  SimpleStates: {
    marginTop: '16px',
    paddingLeft: theme.spacing(1)
  }
}))

const SimpleStates = ({ form, stateStrs }) => {
  const classes = useStyles()
  return (
    <Typography variant="body1" className={classes.SimpleStates}>
      {stateStrs[form.state]}
    </Typography>
  )
}

export default withFormStateHoc(SimpleStates)
