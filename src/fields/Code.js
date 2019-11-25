import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import asField from '../hoc/asField'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minWidth: 120
  }
}))

const Code = ({
  onChange,
  name,
  value,
  errors,
  label,
  helperText,
  required = false,
  height
}) => {
  const classes = useStyles()
  return (
    <FormControl variant="outlined" fullWidth className={classes.formControl}>
      <label
        htmlFor={`outlined-${name}-native`}
        className="MuiFormLabel-root MuiInputLabel-shrink"
      >
        {label}
        {required ? ' *' : ''}
      </label>
      <div>
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          height={height}
          value={value}
          onChange={value => onChange({ target: { value } })}
        />
      </div>
      <FormHelperText>{errors.length ? errors[0] : helperText}</FormHelperText>
    </FormControl>
  )
}

export default asField(Code)
