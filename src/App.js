import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAvailableTimeslots } from './store/bookings/actions'

const App = () => {
    const dispatch = useDispatch()
    useEffect(
        () =>
            dispatch(
                fetchAvailableTimeslots({
                    from: '2021-07-05T07:00:00.000Z',
                    to: '2021-07-05T15:00:00.000Z',
                })
            ),
        []
    )
    return <></>
}

export default App
