import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Person from '@components/OurTeam/Person'
import Vanek from '../../assets/OurTeam/Img/vanek.png'
import { vanekText } from '../../assets/OurTeam/Text/vanek'
import Sebestova from '../../assets/OurTeam/Img/sebestova.png'
import Unknown from '../../assets/OurTeam/Img/no-photo-doctor.png'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
        },
        '& .MuiTypography-body1': {
            color: '#8f8f8f',
            marginBottom: theme.spacing(2),
        },
    },
    personSectionTypo: {
        margin: 'auto',
        marginBottom: '20px',
        marginTop: '20px',
    },
}))
const doctors = [
    { fullName: 'MUDr. Miroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: Vanek, text: vanekText },
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
        <Grid className={classes.root} container spacing={2} id="personnel">
            <Grid item xs={12}>
                <Typography variant="h3">Náš tým</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="center">
                    Naši vysoce vyškolení lékaři, a sestry se věnují ženám všech věkových skupin při zvládání a léčbě
                    různých stavů, problémů a poruch.
                </Typography>
            </Grid>
            <Typography variant="h5" className={classes.personSectionTypo}>
                Lékaři
            </Typography>
            <Grid container justifyContent="center" spacing={8}>
                {doctors.map((doctor) => (
                    <Grid item key={doctor.fullName}>
                        <Person {...doctor} />
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" className={classes.personSectionTypo}>
                Zdravotní sestry
            </Typography>
            <Grid container justifyContent="center" spacing={8}>
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
