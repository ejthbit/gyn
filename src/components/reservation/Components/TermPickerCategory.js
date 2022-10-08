import React, { useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import isNilOrEmpty from 'src/utils/isNilOrEmpty'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookingCategories } from 'src/store/reservationProcess/actions'
import { setSelectedCategory } from 'src/store/reservationProcess/reservationProcessSlice'
import { getBookingCategories, getSelectedCategory } from 'src/store/reservationProcess/selectors'

const TermPickerCategory = () => {
    const dispatch = useDispatch()
    const selectedCategory = useSelector(getSelectedCategory)
    const bookingCategories = useSelector(getBookingCategories)

    useEffect(() => {
        if (isNilOrEmpty(bookingCategories)) dispatch(fetchBookingCategories())
    }, [])

    return (
        <FormControl variant="standard" sx={{ mt: 0.5, minWidth: 120 }} fullWidth>
            <InputLabel id="typeOfCategory" required>
                Typ vyšetření
            </InputLabel>
            <Select
                label="Typ vyšetření"
                variant="standard"
                value={selectedCategory}
                onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                displayEmpty
            >
                {bookingCategories.map(({ name, category_id }) => (
                    <MenuItem key={category_id} value={category_id}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

TermPickerCategory.propTypes = {}

export default TermPickerCategory
