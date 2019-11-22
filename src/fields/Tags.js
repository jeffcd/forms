import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { Input } from './Input'
import asField from '../asFieldHoc'

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5)
  }
}))

const Tags = ({
  onChange,
  name,
  value,
  errors,
  label,
  helperText,
  required = false
}) => {
  const classes = useStyles()
  const handleDelete = index => {
    const newValue = value.split(',')
    newValue.splice(index, 1)
    onChange({ target: { value: newValue.join(',') } })
  }
  const handleChange = e => {
    if (/,$/.test(e.target.value)) {
      const leftValue = value ? `${value},` : ''
      onChange({
        target: { value: `${leftValue}${e.target.value.replace(/,$/, '')}` }
      })
      setNewValue('')
    } else {
      setNewValue(e.target.value)
    }
  }
  const handleBlur = e => {
    if (e.target.value.length) {
      const value = `${e.target.value},`
      handleChange({ target: { value } })
    }
  }
  const [newValue, setNewValue] = useState('')

  return (
    <>
      {value &&
        value.split(',').map((label, index) => {
          return (
            <Chip
              key={index}
              label={label}
              onDelete={() => handleDelete(index)}
              className={classes.chip}
            />
          )
        })}
      <Input
        onChange={e => handleChange(e)}
        onBlur={e => handleBlur(e)}
        name={name}
        helperText={helperText}
        errors={errors}
        value={newValue}
        label={label}
        required={required}
      />
    </>
  )
}

export default asField(Tags)
