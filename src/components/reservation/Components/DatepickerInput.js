import React from 'react'
import PropTypes from 'prop-types'
import { InputAdornment, TextField } from '@mui/material'
import { Today } from '@mui/icons-material'

const DatepickerInput = ({ inputRef, inputProps, InputProps, label, placeholder }) => (
    <TextField
        ref={inputRef}
        {...inputProps}
        label={label}
        placeholder={placeholder}
        variant="standard"
        required
        fullWidth
        InputProps={{
            ...InputProps,
            endAdornment: (
                <InputAdornment sx={{ cursor: 'pointer' }} position="end">
                    <Today />
                </InputAdornment>
            ),
        }}
    />
)

DatepickerInput.propTypes = {
    inputRef: PropTypes.object,
    inputProps: PropTypes.object,
    InputProps: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
}

export default DatepickerInput
