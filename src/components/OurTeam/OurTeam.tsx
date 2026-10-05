import LandingSection from '@components/LandingSection/LandingSection'
import SectionHeading from '@components/LandingSection/SectionHeading'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Medvecka from '../../assets/OurTeam/Img/medvecka.jpg'
import UnknownMale from '../../assets/OurTeam/Img/unkown-male-doctor.png'
import Vanek from '../../assets/OurTeam/Img/vanek.jpg'
import Vankova from '../../assets/OurTeam/Img/vankova.jpg'
import { medveckaText, vanekText, vankovaText } from '../../assets/OurTeam/Text/vanek'
import Person from './Person'

const PREFIX = 'OurTeam'
const classes = { grid: `${PREFIX}-grid` }

const Root = styled(LandingSection)(({ theme }) => ({
    [`& .${classes.grid}`]: {
        display: 'grid',
        gap: theme.spacing(3),
        gridTemplateColumns: 'repeat(4, 1fr)',
        [theme.breakpoints.down('lg')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
        [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
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
    <Root id="personnel">
        <SectionHeading title="Náš tým">
            <p>
                Naši vysoce kvalifikovaní lékaři a sestry se věnují ženám všech věkových kategorii při zvládání různých
                stavů, problémů a poruch, ale také při udržování plného zdraví.
            </p>
        </SectionHeading>
        <Typography
            component="h3"
            variant="overline"
            color="primary"
            sx={{ display: 'block', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', mb: 2 }}
        >
            Lékaři
        </Typography>
        <Box className={classes.grid}>
            {doctors.map((doctor) => (
                <Person key={doctor.fullName} {...doctor} />
            ))}
        </Box>
    </Root>
)

export default OurTeam
