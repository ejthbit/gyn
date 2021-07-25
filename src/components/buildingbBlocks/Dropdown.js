import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import { MenuItem, Select } from '@material-ui/core'

const Dropdown = ({ value, options, onChange, className, label, notSelectedLabel }) => {
    return (
        <Select value={value} onChange={onChange} displayEmpty className={className} label={label} fullWidth>
            <MenuItem key="" value="" disabled={!notSelectedLabel} selected>
                {notSelectedLabel ? notSelectedLabel : 'Nevybráno'}
            </MenuItem>
            {map(
                ({ value, label }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ),
                options
            )}
        </Select>
    )
}

Dropdown.propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
    notSelectedLabel: PropTypes.string,
}

export default Dropdown
