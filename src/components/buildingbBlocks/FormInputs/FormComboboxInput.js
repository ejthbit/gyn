import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useController } from 'react-hook-form'
import Combobox from '../Combobox/Combobox'

const PREFIX = 'FormComboboxInput'

const classes = {
    disabled: `${PREFIX}-disabled`,
}

const FormComboboxInput = ({ control, name, disabled, className, ...otherTextFieldProps }) => {
    const {
        field: { ref, ...inputProps },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    return (
        <Combobox
            className={disabled ? clsx(className, classes.disabled) : className}
            error={!!error}
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
