import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#000',
        height: 200,
        borderRadius: 6,
        wordBreak: 'break-word',
        background: '#FFF',
        paddingBottom: theme.spacing(20),
        backgroundClip: 'border-box',
        boxShadow: '20px 0 60px 45px #96969617',
        border: '1px solid rgba(71,75,96,.15)!important',
        '& .MuiTypography-h5': {
            marginBottom: theme.spacing(1.5),
        },
        '& .MuiTypography-body2': {
            color: '#8f8f8f',
        },
    },
}))
const Service = ({ icon, label, description }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                            {label}
                        </Typography>
                    </Grid>
                    <Grid item container alignItems="center">
                        {/*   TODO: Adjust for mobile devices */}
                        <Grid item xs={2}>
                            {icon}
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2" component="p">
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
