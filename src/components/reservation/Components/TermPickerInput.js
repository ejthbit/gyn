import { Today } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const TermPickerInput = (props) => (
    <TextField
        {...props}
        variant="standard"
        required
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <Today />
                </InputAdornment>
            ),
        }}
    />
)

export default TermPickerInput
