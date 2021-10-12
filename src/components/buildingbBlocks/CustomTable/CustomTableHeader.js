import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const CustomTableHeader = ({
    headCells,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}) => {
    const createSortHandler = (property) => (event) => onRequestSort(event, property)

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all items' }}
                    />
                </TableCell>
                {headCells.map(({ id, disableSorting, label }) => (
                    <TableCell key={`${id}-${label}`} padding="normal" sortDirection={orderBy === id && order}>
                        <TableSortLabel
                            active={orderBy === id}
                            direction={orderBy === id ? order : 'asc'}
                            onClick={(e) => (disableSorting ? e.preventDefault() : createSortHandler(id)())}
                            hideSortIcon={disableSorting}
                        >
                            {label}
                            {orderBy === id && (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

CustomTableHeader.propTypes = {
    headCells: PropTypes.array,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

export default CustomTableHeader
