import { CircularProgress, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(() => ({
    formControl: {
        width: '100%',
    },
}))
const Combobox = ({
    label,
    placeholder,
    options,
    startAdornmentIcon,
    onChange,
    onInputChange,
    value,
    defaultValue = '',
    noOptionsText,
    isLoading,
    ...otherTextFieldProps
}) => {
    const classes = useStyles()
    return (
        <Autocomplete
            className={classes.formControl}
            options={options}
            onChange={onChange}
            onInputChange={onInputChange}
            getOptionLabel={(option) => option.label}
            defaultValue={defaultValue}
            value={(option) => option.value}
            forcePopupIcon={false}
            loading={isLoading}
            noOptionsText={noOptionsText}
            autoHighlight
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...otherTextFieldProps}
                    placeholder={placeholder}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: startAdornmentIcon,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}

Combobox.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    onInputChange: PropTypes.func,
    value: PropTypes.number,
    defaultValue: PropTypes.object,
    startAdornmentIcon: PropTypes.node,
    placeholder: PropTypes.string,
    noOptionsText: PropTypes.string,
    isLoading: PropTypes.bool,
}
export default Combobox
