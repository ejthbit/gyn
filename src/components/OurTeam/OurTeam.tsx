import { Fade, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Medvecka from '../../assets/OurTeam/Img/medvecka.jpg'
import UnknownMale from '../../assets/OurTeam/Img/unkown-male-doctor.png'
import Vanek from '../../assets/OurTeam/Img/vanek.jpg'
import Vankova from '../../assets/OurTeam/Img/vankova.jpg'
import { medveckaText, vanekText, vankovaText } from '../../assets/OurTeam/Text/vanek'
import Person from './Person'

const PREFIX = 'OurTeam'
const classes = {
    root: `${PREFIX}-root`,
    personSectionTypo: `${PREFIX}-personSectionTypo`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: { textAlign: 'center' },
        },
        '& .MuiTypography-body1': { color: '#8f8f8f', marginBottom: theme.spacing(2) },
    },
    [`& .${classes.personSectionTypo}`]: {
        margin: 'auto',
        marginBottom: '20px',
        marginTop: '20px',
    },
}))

const doctors = [
    { fullName: 'MUDr. Miroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: Vanek, text: vanekText },
    { fullName: 'prim. MUDr. Hana Vaňková', specialization: 'Sonografie prsou', image: Vankova, text: vankovaText },
    {
        fullName: 'MUDr. Jana Medvecká',
        specialization: 'Gynekologie a porodnictví',
        image: Medvecka,
        text: medveckaText,
    },
    { fullName: 'MUDr. Jaroslav Vaněk', specialization: 'Gynekologie a porodnictví', image: UnknownMale },
]

const OurTeam = () => (
    <StyledGrid className={classes.root} container spacing={2} id="personnel">
        <Grid item xs={12}>
            <Typography variant="h3">Náš tým</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1" component="p" align="center">
                Naši vysoce kvalifikovaní lékaři a sestry se věnují ženám všech věkových kategorii při zvládání různých
                stavů, problémů a poruch, ale také při udržování plného zdraví.
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h5" className={classes.personSectionTypo}>
                Lékaři
            </Typography>
        </Grid>
        <Grid container justifyContent="center" spacing={8}>
            {doctors.map((doctor, index) => (
                <Fade key={doctor.fullName} in timeout={1000 * (index + 1)}>
                    <Grid item md={3}>
                        <Person {...doctor} />
                    </Grid>
                </Fade>
            ))}
        </Grid>
    </StyledGrid>
)

export default OurTeam
