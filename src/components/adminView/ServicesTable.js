import FormInput from '@components/buildingbBlocks/FormInputs/FormInput'
import FormSelectInput from '@components/buildingbBlocks/FormInputs/FormSelectInput'
import {
    Button,
    makeStyles,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'
import getOpeningHours from '@utilities/getOpeningHours'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { addIndex, map, values } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import DOCTORS from 'src/constants/doctors'
import { createDoctorServiceForMonth, updateDoctorServiceForMonth } from 'src/store/administration/actions'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        boxShadow: 'none',
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
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
    tableRow: {
        '&.MuiTableCell-root': {
            width: 150,
        },
    },
}))

const openingHours = getOpeningHours()
const ServicesTable = ({ data, selectedMonth, isEditingServices, selectedWorkplaceId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { handleSubmit, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { data },
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
    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table} size="medium">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell width="5%">Den</TableCell>
                        <TableCell width="15%">Datum</TableCell>
                        <TableCell width="15%">Doktor</TableCell>
                        <TableCell width="15%">Od:</TableCell>
                        <TableCell width="15%">Do:</TableCell>
                        <TableCell width="35%">Poznámka:</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
                                Uložit
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addIndex(map)(
                        ({ date }, index) => (
                            <TableRow key={date} className={classes.tableRow}>
                                <TableCell width="5%">
                                    {new Date(date).toLocaleString('cs-CZ', { weekday: 'long' })}
                                </TableCell>
                                <TableCell width="15%">{format(new Date(date), 'dd-MM-yyyy')}</TableCell>
                                <TableCell width="15%">
                                    {
                                        <FormSelectInput
                                            name={`data.${index}.doctorId`}
                                            control={control}
                                            fullWidth
                                            required
                                        >
                                            {map(
                                                ({ doctorId: value, name }) => (
                                                    <MenuItem key={value} value={value}>
                                                        {name}
                                                    </MenuItem>
                                                ),
                                                values(DOCTORS)
                                            )}
                                        </FormSelectInput>
                                    }
                                </TableCell>
                                <TableCell width="15%">
                                    <FormSelectInput name={`data.${index}.start`} control={control} fullWidth required>
                                        {map(
                                            (entry) => (
                                                <MenuItem key={entry} value={`${date}T${entry}:00.000Z`}>
                                                    {entry}
                                                </MenuItem>
                                            ),
                                            openingHours
                                        )}
                                    </FormSelectInput>
                                </TableCell>
                                <TableCell width="15%">
                                    <FormSelectInput name={`data.${index}.end`} control={control} fullWidth required>
                                        {map(
                                            (entry) => (
                                                <MenuItem key={entry} value={`${date}T${entry}:00.000Z`}>
                                                    {entry}
                                                </MenuItem>
                                            ),
                                            openingHours
                                        )}
                                    </FormSelectInput>
                                </TableCell>
                                <TableCell width="35%">
                                    <FormInput name={`data.${index}.note`} control={control} fullWidth />
                                </TableCell>
                            </TableRow>
                        ),

                        data
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

ServicesTable.propTypes = {
    data: PropTypes.array,
    selectedMonth: PropTypes.string,
    isEditingServices: PropTypes.bool,
    selectedWorkplaceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ServicesTable
