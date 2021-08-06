import { makeStyles, TextField } from '@material-ui/core'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useController } from 'react-hook-form'

const useStyles = makeStyles(() => ({
    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
        color: 'rgba(0, 0, 0, 0.38)',
        cursor: 'default',
    },
}))

const FormSelectInput = ({ control, name, select, children, disabled, className, ...otherTextFieldProps }) => {
    const classes = useStyles()
    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        defaultValue: '',
    })

    return (
        <TextField
            select
            className={disabled ? clsx(className, classes.disabled) : className}
            error={invalid}
            helperText={error?.message}
            readOnly={disabled}
            inputRef={ref}
            {...inputProps}
            {...otherTextFieldProps}
        >
            {children}
        </TextField>
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
