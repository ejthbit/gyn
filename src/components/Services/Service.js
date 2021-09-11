import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#000',
        borderRadius: 6,
        wordBreak: 'break-word',
        backgroundClip: 'border-box',
        boxShadow: 'none',
        border: 'none',
        background: 'transparent',
        '& .MuiTypography-h5': {
            marginBottom: theme.spacing(1.5),
        },
        '& .MuiTypography-body2': {
            color: '#8f8f8f',
        },
    },
    icon: {
        padding: theme.spacing(1),
        '& svg': {
            padding: 6,
            width: 65,
            height: 65,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 6,
        },
    },
    label: {
        paddingTop: theme.spacing(0.5),
        textAlign: 'center',
    },
}))
const Service = ({ icon, label, description }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12} className={classes.icon}>
                        {icon}
                    </Grid>
                    <Grid item xs={12} className={classes.label}>
                        <Typography variant="h5">{label}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2" component="p" align="center">
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

Service.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    description: PropTypes.string,
}

export default Service
