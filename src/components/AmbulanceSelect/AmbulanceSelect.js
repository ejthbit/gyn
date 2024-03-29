import Dropdown from '@components/buildingbBlocks/Dropdown'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAmbulances } from 'src/store/reservationProcess/actions'
import { setSelectedAmbulance } from 'src/store/reservationProcess/reservationProcessSlice'
import { getSelectedAmbulance, makeArrayOfValueLabelAmbulances } from 'src/store/reservationProcess/selectors'

const selectAmbulancesValueLabelPair = makeArrayOfValueLabelAmbulances()
const AmbulanceSelect = ({ variant = 'standard', label }) => {
    const dispatch = useDispatch()
    const ambulances = useSelector(selectAmbulancesValueLabelPair)
    const selectedAmbulanceId = useSelector(getSelectedAmbulance)
    const handleChangeDoctor = (e) => dispatch(setSelectedAmbulance(e.target.value))

    useEffect(() => {
        if (isNilOrEmpty(ambulances)) dispatch(fetchAmbulances())
    }, [])

    return (
        <>
            {label && (
                <Box marginRight={2}>
                    <Typography>{label}</Typography>
                </Box>
            )}
            <Dropdown
                variant={variant}
                options={ambulances}
                value={selectedAmbulanceId}
                onChange={handleChangeDoctor}
                label="Ambulance"
            />
        </>
    )
}

Dropdown.propTypes = {
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}
export default AmbulanceSelect
