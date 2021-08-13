import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
            textAlign: 'center',
        },
    },
}))
const doctors = [
    { fullName: 'MUDr. Miroslav Vaněk', specialization: 'Gynekologie a porodnictví' },
    { fullName: 'prim. MUDr. Hana Vaňková', specialization: 'Sonografie prsou' },
    { fullName: 'MUDr. Jana Medvecká', specialization: 'Gynekologie a porodnictví' },
]
const nurses = [{ fullName: 'Mgr. Kamila Šebestová' }, { fullName: 'Mgr. Šárka Hrtoňová' }]

const OurTeam = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Náš tým</Typography>
            </Grid>
            {doctors.map((doctor) => `${doctor.fullName} - ${doctor.specialization}`)}
            {nurses.map((nurse) => `${nurse.fullName}`)}
        </Grid>
    )
}
OurTeam.propTypes = {}

export default OurTeam
