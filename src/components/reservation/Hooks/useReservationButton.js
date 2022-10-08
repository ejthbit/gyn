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
            if (dependency.some(isNilOrEmpty) && !isReservationBtnDisabled) dispatch(setReservationBtnDisabled(true))
            else if (!dependency.some(isNilOrEmpty)) dispatch(setReservationBtnDisabled(false))
        }
    }, [dependency, activeStep])
}

export default useReservationButton
