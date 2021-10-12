import ReservationAmbulanceSelect from '@components/reservation/ReservationAmbulanceSelect'
import ReservationContactInputs from '@components/reservation/ReservationContactInputs'
import ReservationDoctorPreference from '@components/reservation/ReservationDoctorPreference'
import ReservationError from '@components/reservation/ReservationError'
import ReservationSuccess from '@components/reservation/ReservationSuccess'
import ReservationSummary from '@components/reservation/ReservationSummary'
import ReservationTermPicker from '@components/reservation/ReservationTermPicker'
import { CircularProgress } from '@mui/material'
import React from 'react'

const getStepperContent = (step) => {
    const content = {
        first: <ReservationAmbulanceSelect />,
        second: <ReservationDoctorPreference />,
        third: <ReservationTermPicker />,
        forth: <ReservationContactInputs />,
        fifth: <ReservationSummary />,
        success: <ReservationSuccess />,
        error: <ReservationError />,
        default: <CircularProgress />,
    }
    return content[step] ?? content['default']
}
export default getStepperContent
