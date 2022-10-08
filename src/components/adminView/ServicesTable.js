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
import { equals, filter, map, values } from 'ramda'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createDoctorServiceForMonth, updateDoctorServiceForMonth } from 'src/store/administration/actions'
import { getDoctorsForSelectedAmbulance } from 'src/store/reservationProcess/selectors'
import DoctorEntryMenu from './components/DoctorEntryMenu'

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
    [`& .${classes.tableRow}`]: {
        width: 180,
        maxWidth: 180,
    },
}))

const openingHours = getOpeningHours()
const ServicesTable = ({ data, selectedMonth, isEditingServices, selectedWorkplaceId }) => {
    const dispatch = useDispatch()
    const selectedDoctors = useSelector(getDoctorsForSelectedAmbulance)
    const { handleSubmit, control, setValue, reset, watch } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { data },
    })
    const formState = watch()?.data
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

    const handleRemoveDoctorFromDay = (rowIndex, doctorIndex) => {
        const id = formState[rowIndex].doctors[doctorIndex]?.doctorId
        const updatedValue = filter(({ doctorId }) => !equals(doctorId, id), formState[rowIndex].doctors)
        return update(rowIndex, {
            ...formState[rowIndex],
            doctors: updatedValue,
        })
    }
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
                            <TableCell align="center" rowSpan="1" colSpan="8">
                                Seznam doktorů
                            </TableCell>
                            <TableCell rowSpan="2" align="center" sx={{ width: 50 }}>
                                Přídat řádek
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableRow}>Doktor</TableCell>
                            <TableCell className={classes.tableRow}>Od</TableCell>
                            <TableCell className={classes.tableRow}>Do</TableCell>
                            <TableCell align="center" sx={{ width: 250, maxWidth: 250 }}>
                                Poznámka
                            </TableCell>
                            <TableCell align="center" sx={{ width: 50, maxWidth: 50 }}>
                                Akce
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map(({ date, doctors, id }, idx) => (
                            <TableRow
                                key={id}
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
                                            {/*
                                                 TODO: Move to separate component and fix using this issue solution, move onDelete and OnAssign too
                                                https://stackoverflow.com/questions/66727547/reset-nested-array-in-react-hook-form */}
                                            {doctors.map(({ id }, index) => (
                                                <TableRow key={`${id}_${index}`}>
                                                    <TableCell className={classes.tableRow}>
                                                        <FormSelectInput
                                                            name={`data.${idx}.doctors.${index}.doctorId`}
                                                            control={control}
                                                            fullWidth
                                                            required
                                                        >
                                                            <MenuItem
                                                                value=""
                                                                onClick={() => {
                                                                    setValue(`data.${idx}.doctors.${index}.start`, '')
                                                                    setValue(`data.${idx}.doctors.${index}.end`, '')
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
                                                    <TableCell className={classes.tableRow}>
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
                                                    <TableCell className={classes.tableRow}>
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
                                                    <TableCell sx={{ width: 250, maxWidth: 250 }}>
                                                        <FormInput
                                                            name={`data.${idx}.doctors.${index}.note`}
                                                            control={control}
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ width: 50, maxWidth: 50 }}>
                                                        <DoctorEntryMenu
                                                            onDelete={() => handleRemoveDoctorFromDay(idx, index)}
                                                            disabled={doctors.length <= 1}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: 50,
                                        maxWidth: 50,
                                        display:
                                            formState[idx].doctors.length < values(selectedDoctors).length
                                                ? 'table-cell'
                                                : 'none',
                                    }}
                                >
                                    <Button onClick={() => handleAssignDoctorToDay(idx)}>
                                        <Add />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
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
