import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { default as MSelect } from '@material-ui/core/Select'
import asField from '../asFieldHoc'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const Select = ({
  onChange,
  name,
  value,
  errors,
  label,
  helperText,
  required = false,
  options
}) => {
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl variant="outlined" fullWidth className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor={`outlined-${name}-native`}>
        {label}
      </InputLabel>
      <MSelect
        native
        fullWidth
        value={value}
        onChange={e => onChange(e)}
        labelWidth={labelWidth}
        inputProps={{
          name,
          id: `outlined-${name}-native`
        }}
        required={required}
        error={errors.length > 0}
      >
        <option value="" />
        {options.map(opt => {
          const value = opt.value || opt.name
          return (
            <option key={opt.name} value={value}>
              {opt.name}
            </option>
          )
        })}
      </MSelect>
      <FormHelperText>{errors.length ? errors[0] : helperText}</FormHelperText>
    </FormControl>
  )
}

export default asField(Select)
