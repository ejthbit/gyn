import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Person from '@components/OurTeam/Person'
import Vanek from '../../assets/OurTeam/vanek.png'
import Sebestova from '../../assets/OurTeam/sebestova.png'

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
    personGrid: {
        display: 'flex',
    },
}))
const doctors = [
    { fullName: 'MUDr. Miroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: Vanek },
    { fullName: 'prim. MUDr. Hana Vaňková', specialization: 'Sonografie prsou' },
    { fullName: 'MUDr. Jana Medvecká', specialization: 'Gynekologie a porodnictví' },
]
const nurses = [{ fullName: 'Mgr. Kamila Šebestová', image: Sebestova }, { fullName: 'Mgr. Šárka Hrtoňová' }]

const OurTeam = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Náš tým</Typography>
            </Grid>
            <Typography variant="h4">Doktoři</Typography>
            <Grid item xs={12} className={classes.personGrid}>
                {doctors.map((doctor) => (
                    <Person key={doctor.fullName} {...doctor} />
                ))}
            </Grid>
            <Typography variant="h4">Zdravotní sestry</Typography>
            <Grid item xs={12} className={classes.personGrid}>
                {nurses.map((nurse) => (
                    <Person key={nurse.fullName} {...nurse} />
                ))}
            </Grid>
        </Grid>
    )
}
OurTeam.propTypes = {}

export default OurTeam
