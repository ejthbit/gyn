import React from 'react'
import { Button, Grid } from '@material-ui/core'

const DoctorServicesView = () => {
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
                <Button variant="contained" color="primary">
                    Vytvořit nový rozpis
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined">Upravit existující rozpis</Button>
            </Grid>
        </Grid>
    )
}
DoctorServicesView.propTypes = {}

export default DoctorServicesView
