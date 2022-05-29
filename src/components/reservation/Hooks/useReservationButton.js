import { equals } from 'ramda'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReservationBtnDisabled } from 'src/store/reservationProcess/reservationProcessSlice'
import { getActiveStep, getDisabledReservationBtn } from 'src/store/reservationProcess/selectors'
import isNilOrEmpty from 'src/utils/isNilOrEmpty'

const useReservationButton = ({ dependency, step }) => {
    const dispatch = useDispatch()
    const activeStep = useSelector(getActiveStep)
    const isReservationBtnDisabled = useSelector(getDisabledReservationBtn)

    useEffect(() => {
        if (equals(activeStep, step)) {
            if (isNilOrEmpty(dependency) && !isReservationBtnDisabled) dispatch(setReservationBtnDisabled(true))
            else if (!isNilOrEmpty(dependency)) dispatch(setReservationBtnDisabled(false))
        }
    }, [dependency, activeStep])
}

export default useReservationButton
