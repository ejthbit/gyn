import { Button, Paper, Typography, makeStyles } from '@material-ui/core'
import { Done, Error } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}))

const VARIANT = {
    error: 'error',
    success: 'success',
}

const StepContentWithBtn = ({ text, variant, onBtnClick, btnText, onSecondaryBtnClick, secondaryBtnText }) => {
    const classes = useStyles()
    return (
        <Paper square elevation={0}>
            {equals(typeof text, 'string') ? (
                <Typography color={equals(variant, VARIANT.success) ? 'primary' : 'error'}>
                    {text} {equals(variant, VARIANT.success) ? <Done /> : <Error />}
                </Typography>
            ) : (
                text
            )}
            {onSecondaryBtnClick && secondaryBtnText && (
                <Button variant="outlined" color="default" onClick={onSecondaryBtnClick} className={classes.button}>
                    {secondaryBtnText}
                </Button>
            )}
            <Button variant="outlined" color="primary" onClick={onBtnClick} className={classes.button}>
                {btnText}
            </Button>
        </Paper>
    )
}

StepContentWithBtn.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    variant: PropTypes.string,
    onBtnClick: PropTypes.func,
    btnText: PropTypes.string,
    onSecondaryBtnClick: PropTypes.func,
    secondaryBtnText: PropTypes.string,
}

export default StepContentWithBtn
