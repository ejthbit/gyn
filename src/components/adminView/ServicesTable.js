import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import FormSelectInput from '@components/buildingbBlocks/FormInputs/FormSelectInput'
import { Add } from '@mui/icons-material'
import {
    Box,
    Button,
    Fade,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import getOpeningHours from '@utilities/getOpeningHours'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { addIndex, map, values } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createDoctorServiceForMonth, updateDoctorServiceForMonth } from 'src/store/administration/actions'
import { getDoctorsForSelectedAmbulance } from 'src/store/reservationProcess/selectors'

const PREFIX = 'ServicesTable'

const classes = {
    root: `${PREFIX}-root`,
    paper: `${PREFIX}-paper`,
    table: `${PREFIX}-table`,
    visuallyHidden: `${PREFIX}-visuallyHidden`,
    tableRow: `${PREFIX}-tableRow`,
}

const StyledFade = styled(Fade)(({ theme }) => ({
    [`& .${classes.root}`]: {
        width: '100%',
    },

    [`& .${classes.paper}`]: {
        boxShadow: 'none',
        width: '100%',
        marginBottom: theme.spacing(2),
    },

    [`& .${classes.table}`]: {
        minWidth: 750,
    },

    [`& .${classes.visuallyHidden}`]: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

const openingHours = getOpeningHours()
const ServicesTable = ({ data, selectedMonth, isEditingServices, selectedWorkplaceId }) => {
    const dispatch = useDispatch()
    const [formState, setFormState] = useState(data)
    const selectedDoctors = useSelector(getDoctorsForSelectedAmbulance)
    const { handleSubmit, control, setValue, reset, watch } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { data },
    })

    useEffect(() => {
        const subscription = watch((value) => setFormState(value.data))
        return () => subscription.unsubscribe()
    }, [watch])

    const { fields, update } = useFieldArray({ name: 'data', control, shouldUnregister: true })
    const handleAssignDoctorToDay = (index) =>
        update(index, {
            ...formState[index],
            doctors: [
                ...formState[index].doctors,
                {
                    doctorId: '',
                    start: '',
                    end: '',
                    note: '',
                },
            ],
        })
    const onSubmit = ({ data }) => {
        const apiData = {
            month: selectedMonth,
            days: data,
            workplace: selectedWorkplaceId,
        }
        !isEditingServices
            ? dispatch(createDoctorServiceForMonth(apiData))
            : dispatch(updateDoctorServiceForMonth(apiData))
    }

    useEffect(() => {
        reset({ data })
    }, [data])

    return (
        <StyledFade in timeout={500}>
            <TableContainer component={Paper} className={classes.paper}>
                <Table className={classes.table} size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan="2">Den</TableCell>
                            <TableCell rowSpan="2">Datum</TableCell>
                            <TableCell align="center" colSpan="8">
                                Seznam doktorů
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Doktor</TableCell>
                            <TableCell colSpan={1}>Od</TableCell>
                            <TableCell colSpan={1}>Do</TableCell>
                            <TableCell colSpan={3}>Poznámka</TableCell>
                            <TableCell colSpan={1}>Akce</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addIndex(map)(
                            ({ date, doctors }, idx) => (
                                <TableRow
                                    key={date}
                                    sx={{
                                        borderBottom: '1px solid #e0e0e0',
                                    }}
                                >
                                    <TableCell width="10%">
                                        {new Date(date).toLocaleString('cs-CZ', { weekday: 'long' })}
                                    </TableCell>
                                    <TableCell width="10%">{format(new Date(date), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell colSpan={8} sx={{ padding: 0 }}>
                                        <Table>
                                            <TableBody>
                                                {addIndex(map)(
                                                    ({ id }, index) => (
                                                        <TableRow key={id}>
                                                            <TableCell colSpan={2}>
                                                                <FormSelectInput
                                                                    name={`data.${idx}.doctors.${index}.doctorId`}
                                                                    control={control}
                                                                    fullWidth
                                                                    required
                                                                >
                                                                    <MenuItem
                                                                        value=""
                                                                        onClick={() => {
                                                                            setValue(
                                                                                `data.${idx}.doctors.${index}.start`,
                                                                                ''
                                                                            )
                                                                            setValue(
                                                                                `data.${idx}.doctors.${index}.end`,
                                                                                ''
                                                                            )
                                                                        }}
                                                                    >
                                                                        Zavřeno
                                                                    </MenuItem>
                                                                    {map(
                                                                        ({ doctor_id: value, name }) => (
                                                                            <MenuItem key={value} value={value}>
                                                                                {name}
                                                                            </MenuItem>
                                                                        ),
                                                                        values(selectedDoctors)
                                                                    )}
                                                                </FormSelectInput>
                                                            </TableCell>
                                                            <TableCell colSpan={1}>
                                                                <FormSelectInput
                                                                    name={`data.${idx}.doctors.${index}.start`}
                                                                    control={control}
                                                                    fullWidth
                                                                    required
                                                                >
                                                                    {map(
                                                                        (entry) => (
                                                                            <MenuItem
                                                                                key={entry}
                                                                                value={`${date}T${entry}:00.000Z`}
                                                                            >
                                                                                {entry}
                                                                            </MenuItem>
                                                                        ),
                                                                        openingHours
                                                                    )}
                                                                </FormSelectInput>
                                                            </TableCell>
                                                            <TableCell colSpan={1}>
                                                                <FormSelectInput
                                                                    name={`data.${idx}.doctors.${index}.end`}
                                                                    control={control}
                                                                    fullWidth
                                                                    required
                                                                >
                                                                    {map(
                                                                        (entry) => (
                                                                            <MenuItem
                                                                                key={entry}
                                                                                value={`${date}T${entry}:00.000Z`}
                                                                            >
                                                                                {entry}
                                                                            </MenuItem>
                                                                        ),
                                                                        openingHours
                                                                    )}
                                                                </FormSelectInput>
                                                            </TableCell>
                                                            <TableCell colSpan={3}>
                                                                <FormInput
                                                                    name={`data.${idx}.doctors.${index}.note`}
                                                                    control={control}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={1}>
                                                                <Button onClick={() => handleAssignDoctorToDay(idx)}>
                                                                    <Add />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                    doctors
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                </TableRow>
                            ),
                            fields
                        )}
                    </TableBody>
                </Table>
                <Box margin={1}>
                    <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
                        Uložit
                    </Button>
                </Box>
            </TableContainer>
        </StyledFade>
    )
}

ServicesTable.propTypes = {
    data: PropTypes.array,
    selectedMonth: PropTypes.string,
    isEditingServices: PropTypes.bool,
    selectedWorkplaceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ServicesTable
