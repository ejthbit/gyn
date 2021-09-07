import { IconButton, lighten, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.primary.main,
                  backgroundColor: lighten(theme.palette.primary.main, 0.85),
                  marginTop: theme.spacing(2),
                  borderRadius: 6,
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
}))

const CustomTableToolbar = ({ selectedItems, onDelete, title }) => {
    const classes = useStyles()
    const NUMBER_OF_SELECTED_ITEMS = selectedItems.length

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: NUMBER_OF_SELECTED_ITEMS > 0,
            })}
        >
            {NUMBER_OF_SELECTED_ITEMS > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {NUMBER_OF_SELECTED_ITEMS} Vybraných záznamů
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}
            {NUMBER_OF_SELECTED_ITEMS > 0 && (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={onDelete}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}

CustomTableToolbar.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    title: PropTypes.string,
}

export default CustomTableToolbar
