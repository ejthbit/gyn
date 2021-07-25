/* eslint-disable react/jsx-one-expression-per-line */
import TypographyExists from '@components/buildingbBlocks/TypographyExists'
import { Grid } from '@material-ui/core'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { values, map, reject } from 'ramda'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getContactInformation, makeAppointmentDate } from '/src/store/reservationProcess/selectors'

const getAppointmentDate = makeAppointmentDate()
const ReservationSummary = () => {
    const contactInformation = useSelector(getContactInformation)
    const appointmentDate = useSelector(getAppointmentDate)

    const userInfo = useMemo(
        () =>
            map((item) => {
                return !isNilOrEmpty(item) ? { title: item, value: item } : null
            }, values(contactInformation)),
        [contactInformation]
    )

    const summaryInformation = useMemo(
        () =>
            reject(isNilOrEmpty, [
                { title: `Termín návštevy: ${appointmentDate}`, value: appointmentDate },
                ...userInfo,
            ]),
        [contactInformation, appointmentDate]
    )

    return (
        <Grid container direction="column">
            {map(
                ({ title, value }) => (
                    <TypographyExists key={value} value={value} title={title} />
                ),
                summaryInformation
            )}
        </Grid>
    )
}

export default ReservationSummary
