import { Box, TextField } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { Close, Edit, Check } from '@material-ui/icons'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { always, ascend, descend, equals, ifElse, prop, sortWith, indexOf } from 'ramda'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { compose } from 'redux'
import { deleteBookings, patchBooking } from 'src/store/bookings/actions'
import CustomTableHeader from './CustomTableHeader'
import CustomTableToolbar from './CustomTableToolbar'

const sortDirection = ifElse(equals('desc'), always(descend), always(ascend))
const sortByProperty = (order, orderBy, data) => sortWith([compose(sortDirection(order), prop)(orderBy)], data)

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
            width: 250,
        },
    },
}))

const CustomTable = ({ title, data, orderBy: orderedBy, headCells }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(orderedBy)
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentlyEditingId, setCurrentlyEditingId] = useState(-1)
    const [editingData, setEditingData] = useState(undefined)
    console.log(editingData)

    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelectedIds = data.map((booking) => booking.id)
            setSelected(newSelectedIds)
            return
        }
        setSelected([])
    }

    const handleUpdateBooking = async () => {
        await dispatch(patchBooking(editingData))
        setCurrentlyEditingId(-1)
    }

    const handleClick = (e, id) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected = []
        if (selectedIndex === -1) newSelected = newSelected.concat(selected, id)
        else if (selectedIndex === 0) newSelected = newSelected.concat(selected.slice(1))
        else if (selectedIndex === selected.length - 1) newSelected = newSelected.concat(selected.slice(0, -1))
        else if (selectedIndex > 0)
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
        setSelected(newSelected)
    }

    const handleChangePage = (e, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    }

    const handleDeleteSelectedItems = async () => {
        const shouldDelete = window.confirm('Jste si jisti, že chcete odstranit vybrané položky? ')
        if (shouldDelete) {
            const { error } = await dispatch(deleteBookings(selected))
            if (!error) setSelected([])
        }
    }

    const isSelected = (id) => selected.indexOf(id) !== -1

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
        !isNilOrEmpty(data) && (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <CustomTableToolbar title={title} selectedItems={selected} onDelete={handleDeleteSelectedItems} />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size="medium"
                            aria-label="enhanced table"
                        >
                            <CustomTableHeader
                                headCells={headCells}
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {sortByProperty(order, orderBy, data)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id)
                                        const date = new Date(row.timeofbooking)
                                        const rowDate = format(date, 'yyyy/MM/dd')
                                        const rowTime = row.timeofbooking.substr(11, 8)
                                        const labelId = `enhanced-table-checkbox-${index}`
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={`${rowDate}-${rowTime}`}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        onClick={(e) => handleClick(e, row.id)}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell id={labelId}>{rowDate}</TableCell>
                                                <TableCell>{rowTime}</TableCell>
                                                <TableCell>
                                                    {equals(row.id, currentlyEditingId) ? (
                                                        <TextField
                                                            value={editingData?.name}
                                                            onChange={(e) => {
                                                                setEditingData((prevData) => ({
                                                                    ...prevData,
                                                                    name: e.target.value,
                                                                }))
                                                            }}
                                                        />
                                                    ) : (
                                                        row.name
                                                    )}
                                                </TableCell>
                                                <TableCell>{row.birthdate}</TableCell>
                                                <TableCell>{row.email || ''}</TableCell>
                                                <TableCell>{row.phone || ''}</TableCell>
                                                <TableCell>
                                                    {equals(row.id, currentlyEditingId) ? (
                                                        <Box display="row">
                                                            <Check onClick={handleUpdateBooking} />
                                                            <Close onClick={() => setCurrentlyEditingId(-1)} />
                                                        </Box>
                                                    ) : (
                                                        <Edit
                                                            onClick={() => {
                                                                setCurrentlyEditingId(row.id)
                                                                setEditingData(data[indexOf(row, data)])
                                                            }}
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Počet záznamů na stránce"
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                    />
                </Paper>
            </div>
        )
    )
}

CustomTable.propTypes = {
    data: PropTypes.array,
    orderBy: PropTypes.string,
    title: PropTypes.string,
    headCells: PropTypes.array,
}
export default CustomTable
