import FormSelectInput from '@components/buildingbBlocks/FormInputs/FormSelectInput'
import {
    Button,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { addIndex, map, values } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'
import DOCTORS from 'src/constants/doctors'

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

const ServicesTable = ({ data }) => {
    const classes = useStyles()

    const { handleSubmit, formState, control } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { data },
    })

    const onSubmit = (data) => console.log(data)

    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table} size="medium">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell width="10%">Datum</TableCell>
                        <TableCell width="40%">Doktor</TableCell>
                        <TableCell width="25%">Od:</TableCell>
                        <TableCell width="25%">Do:</TableCell>
                        <TableCell>
                            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addIndex(map)(
                        ({ date, doctorId, start, end }, index) => (
                            <TableRow key={date} className={classes.tableRow}>
                                <TableCell width="10%">{date}</TableCell>
                                <TableCell width="40%">
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
                                <TableCell width="25%">{start}</TableCell>
                                <TableCell width="25%">{end}</TableCell>
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
}

export default ServicesTable
