import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Person from '@components/OurTeam/Person'
import Vanek from '../../assets/OurTeam/vanek.png'
import Sebestova from '../../assets/OurTeam/sebestova.png'
import Unknown from '../../assets/OurTeam/unknown.png'

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
    personContainer: {
        margin: '0px 20px 20px 0px',
    },
    personSectionTypo: {
        margin: 'auto',
    },
}))
const doctors = [
    { fullName: 'MUDr. Miroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: Vanek },
    { fullName: 'prim. MUDr. Hana Vaňková', specialization: 'Sonografie prsou', image: Unknown },
    { fullName: 'MUDr. Jana Medvecká', specialization: 'Gynekologie a porodnictví', image: Unknown },
]
const nurses = [
    { fullName: 'Mgr. Kamila Šebestová', image: Sebestova },
    { fullName: 'Mgr. Šárka Hrtoňová', image: Unknown },
]

const OurTeam = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Náš tým</Typography>
            </Grid>
            <Typography variant="overline" className={classes.personSectionTypo}>
                Doktoři
            </Typography>
            <Grid container justifyContent="center" spacing={4} className={classes.personContainer}>
                {doctors.map((doctor) => (
                    <Grid item key={doctor.fullName}>
                        <Person {...doctor} />
                    </Grid>
                ))}
            </Grid>
            <Typography variant="overline" className={classes.personSectionTypo}>
                Zdravotní sestry
            </Typography>
            <Grid container justifyContent="center" spacing={4} className={classes.personContainer}>
                {nurses.map((nurse) => (
                    <Grid item key={nurse.fullName}>
                        <Person {...nurse} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
OurTeam.propTypes = {}

export default OurTeam
