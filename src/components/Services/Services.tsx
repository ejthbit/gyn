import {
    Advisementicon,
    DiagnosticIcon,
    PregnancyCareIcon,
    RoutineExaminationIcon,
    SonographyIcon,
    SpecialTreatmentIcon,
} from '@assets/SvgIcons'
import LandingSection from '@components/LandingSection/LandingSection'
import SectionHeading from '@components/LandingSection/SectionHeading'
import Reveal from '@components/Reveal/Reveal'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import Service from './Service'

const PREFIX = 'Services'
const classes = { grid: `${PREFIX}-grid` }

const Root = styled(LandingSection)(({ theme }) => ({
    [`& .${classes.grid}`]: {
        display: 'grid',
        gap: theme.spacing(3),
        gridTemplateColumns: 'repeat(3, 1fr)',
        [theme.breakpoints.down('md')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
        [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
    },
}))

const services = [
    {
        icon: <RoutineExaminationIcon />,
        label: 'Preventivní prohlídky',
        description:
            'Od svých 15 let má každá žena nárok na bezplatnou preventivní prohlídku u gynekologa, a to jedenkrát za rok (po uplynutí 11 měsíců). Prohlídka je přizpůsobena věku ženy a tomu, zda je sexuálně aktivní.',
    },
    {
        icon: <PregnancyCareIcon />,
        label: 'Péče o těhotné',
        description:
            'Zajišťujeme péči o budoucí maminky včetně ultrazvuku, krevních testů, pravidelných prohlídek a zprostředkovaně také screening vrozených vývojových vad plodu.',
    },
    {
        icon: <Advisementicon />,
        label: 'Poradenství',
        description: 'Nabízíme poradenství v oblastech antikoncepce, přechodu a gynekologických potížích.',
    },
    {
        icon: <SonographyIcon />,
        label: 'Sonografie prsu',
        description:
            'Sonografické, neboli ultrazvukové vyšetření prsou patří v dnešní době k nejdůležitějším vyšetřovacím praktikám sloužícím k včasnému nálezu rakoviny prsou.',
    },
    {
        icon: <DiagnosticIcon />,
        label: 'Prevence a diagnostika nádorových onemocnění',
        description:
            'Součástí každé preventivní prohlídky je také onkologická cytologie, která pomáhá s včasným záchytem nádorových onemocnění čípku děložního, pochvy, sliznice děložní i zevního genitálu.',
    },
    {
        icon: <SpecialTreatmentIcon />,
        label: 'Speciální vyšetření',
        description:
            'Mimo jiné se zabýváme také léčbou sterility, přípravou pacientek do zařazení IVF programů či dětskou gynekologií.',
    },
]

const Services = () => (
    <Root id="services">
        <SectionHeading title="Naše služby">
            <p>
                Naše ambulance nabízí těhotenskou a gynekologickou péči pro ženy ve všech fázích života, od
                předpubertálních let po postmenopauzální období.
            </p>
            <p>
                Svým pacientkám chceme dopřát co nejkomplexnější péči, proto nabízíme speciální služby včetně mateřské
                fetální medicíny, gynekologické onkologie, antikoncepčního poradenství a dalších. Další informace o tom,
                jak vám můžeme pomoci, naleznete v níže uvedených službách.
            </p>
        </SectionHeading>
        <Box className={classes.grid}>
            {services.map(({ icon, label, description }, index) => (
                <Reveal key={label} delay={(index % 3) * 100}>
                    <Service icon={icon} label={label} description={description} />
                </Reveal>
            ))}
        </Box>
    </Root>
)

export default Services
