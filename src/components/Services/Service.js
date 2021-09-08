import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#000',
        height: 200,
        borderRadius: 6,
        wordBreak: 'break-word',
        paddingBottom: theme.spacing(20),
        backgroundClip: 'border-box',
        boxShadow: 'none',
        border: 'none',
        background: 'transparent',

        // border: '1px solid rgba(71,75,96,.15)!important',
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
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 6,
            '& path': {
                stroke: '#000',
            },
        },
    },
    label: {
        paddingTop: theme.spacing(0.5),
    },
    description: {},
}))
const Service = ({ icon, label, description }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container>
                    <Grid container item xs={12} alignItems="center">
                        <Grid item xs={2} className={classes.icon}>
                            {icon}
                        </Grid>
                        <Grid item xs={10} className={classes.label}>
                            <Typography variant="h5">{label}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={2} />
                        <Grid item xs={10}>
                            <Typography variant="body2" component="p" className={classes.description}>
                                {description}
                            </Typography>
                        </Grid>
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
