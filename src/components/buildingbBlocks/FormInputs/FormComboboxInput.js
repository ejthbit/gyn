import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useController } from 'react-hook-form'
import Combobox from '../Combobox/Combobox'

const useStyles = makeStyles(() => ({
    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
        color: 'rgba(0, 0, 0, 0.38)',
        cursor: 'default',
    },
}))

const FormComboboxInput = ({ control, name, disabled, className, ...otherTextFieldProps }) => {
    const classes = useStyles()
    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    return (
        <Combobox
            className={disabled ? clsx(className, classes.disabled) : className}
            error={invalid}
            helperText={error?.message}
            readOnly={disabled}
            inputRef={ref}
            {...inputProps}
            {...otherTextFieldProps}
        />
    )
}

FormComboboxInput.propTypes = {
    control: PropTypes.object,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default FormComboboxInput
