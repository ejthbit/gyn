import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Person from '@components/OurTeam/Person'
import Vanek from '../../assets/OurTeam/Img/vanek.jpg'
import { vanekText } from '../../assets/OurTeam/Text/vanek'
import Vankova from '../../assets/OurTeam/Img/vankova.jpg'
import Hrtonova from '../../assets/OurTeam/Img/hrtonova.jpg'
import Medvecka from '../../assets/OurTeam/Img/medvecka.jpg'
import UnknownMale from '../../assets/OurTeam/Img/unkown-male-doctor.png'

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
                textAlign: 'center',
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
    { fullName: 'prim. MUDr. Hana Vaňková', specialization: 'Sonografie prsou', image: Vankova },
    { fullName: 'MUDr. Jana Medvecká', specialization: 'Gynekologie a porodnictví', image: Medvecka },
    { fullName: 'MUDr. Jaroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: UnknownMale },
]
const nurses = [{ fullName: 'Šárka Hrtoňová', image: Hrtonova }]

const OurTeam = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2} id="personnel">
            <Grid item xs={12}>
                <Typography variant="h3">Náš tým</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="center">
                    Naši vysoce kvalifikovaní lékaři, a sestry se věnují ženám všech věkových kategorii při zvládání a
                    léčbě různých stavů, problémů a poruch.
                </Typography>
            </Grid>
            <Typography variant="h5" className={classes.personSectionTypo}>
                Lékaři
            </Typography>
            <Grid container justifyContent="center" spacing={8}>
                {doctors.map((doctor) => (
                    <Grid item md={3} key={doctor.fullName}>
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

export default OurTeam
