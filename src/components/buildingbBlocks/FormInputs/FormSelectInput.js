import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useController } from 'react-hook-form'

const PREFIX = 'FormSelectInput'

const classes = {
    disabled: `${PREFIX}-disabled`,
}

const StyledTextField = styled(TextField)(() => ({
    [`& .${classes.disabled}`]: {
        opacity: 0.5,
        pointerEvents: 'none',
        color: 'rgba(0, 0, 0, 0.38)',
        cursor: 'default',
    },
}))

const FormSelectInput = ({ control, name, children, disabled, className, ...otherTextFieldProps }) => {
    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        defaultValue: '',
    })

    return (
        <StyledTextField
            select
            variant="standard"
            className={disabled ? clsx(className, classes.disabled) : className}
            error={invalid}
            helperText={error?.message}
            readOnly={disabled}
            inputRef={ref}
            SelectProps={{
                MenuProps: {
                    disableScrollLock: true,
                },
            }}
            {...inputProps}
            {...otherTextFieldProps}
        >
            {children}
        </StyledTextField>
    )
}

FormSelectInput.propTypes = {
    control: PropTypes.object,
    select: PropTypes.object,
    children: PropTypes.node,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default FormSelectInput
