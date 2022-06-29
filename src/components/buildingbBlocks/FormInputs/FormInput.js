import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

const disabledStyling = {
    opacity: 0.5,
    pointerEvents: 'none',
    color: 'rgba(0, 0, 0, 0.38)',
    cursor: 'default',
}

const FormInput = ({ control, name, disabled, className, ...otherTextFieldProps }) => {
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
            variant="standard"
            className={className}
            sx={disabled ? { ...disabledStyling } : {}}
            error={invalid}
            helperText={error?.message}
            readOnly={disabled}
            inputRef={ref}
            {...inputProps}
            {...otherTextFieldProps}
        />
    )
}

FormInput.propTypes = {
    control: PropTypes.object,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default FormInput
