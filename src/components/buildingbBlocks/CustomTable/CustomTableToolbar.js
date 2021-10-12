import { Delete, Done } from '@mui/icons-material'
import { IconButton, lighten, Toolbar, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

const PREFIX = 'CustomTableToolbar'

const classes = {
    root: `${PREFIX}-root`,
    highlight: `${PREFIX}-highlight`,
    title: `${PREFIX}-title`,
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },

    [`&.${classes.highlight}`]:
        theme.palette.mode === 'light'
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

    [`& .${classes.title}`]: {
        flex: '1 1 100%',
    },
}))

const CustomTableToolbar = ({ selectedItems, onDelete, onCompleted, title }) => {
    const NUMBER_OF_SELECTED_ITEMS = selectedItems.length

    return (
        <StyledToolbar
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
                <>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={onDelete} size="large">
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Complete">
                        <IconButton aria-label="complete" onClick={onCompleted} size="large">
                            <Done />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </StyledToolbar>
    )
}

CustomTableToolbar.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    title: PropTypes.string,
}

export default CustomTableToolbar
