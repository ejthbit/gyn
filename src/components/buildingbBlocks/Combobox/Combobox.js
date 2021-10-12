import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'

const PREFIX = 'Combobox'

const classes = {
    formControl: `${PREFIX}-formControl`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
    [`& .${classes.formControl}`]: {
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
    defaultValue = '',
    noOptionsText,
    isLoading,
    ...otherTextFieldProps
}) => {
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
                            <Root>
                                {isLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Root>
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
