import React from 'react'
import TextField from '@material-ui/core/TextField'
import asField from '../hoc/asField'

const Input = ({
  onChange,
  onBlur = () => {},
  name,
  value,
  errors,
  label,
  helperText,
  required = false,
  multiline = false,
  rows = 1,
  rowsMax = 4
}) => {
  return (
    <TextField
      id={`outlined-${name}-basic`}
      name={name}
      value={value}
      onChange={e => onChange(e)}
      onBlur={e => onBlur(e)}
      label={label}
      margin="normal"
      variant="outlined"
      fullWidth
      required={required}
      error={errors.length > 0}
      helperText={errors.length ? errors[0] : helperText}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
    />
  )
}

export { Input }
export default asField(Input)
