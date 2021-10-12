import {
    Advisementicon,
    DiagnosticIcon,
    PregnancyCareIcon,
    RoutineExaminationIcon,
    SonographyIcon,
    SpecialTreatmentIcon,
} from '@assets/SvgIcons'
import { Divider, Fade, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isMobile } from '@utilities/checkDeviceType'
import React from 'react'
import Service from './Service'

const PREFIX = 'Services'

const classes = {
    root: `${PREFIX}-root`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingBottom: '10%',
        '& .MuiTypography-h3': {
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
        },
        '& .MuiTypography-body1': {
            color: '#8f8f8f',
        },
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
        description: 'Nabizíme poradenství v oblastech antikoncepce, přechodu a gynekologických potížích.',
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
        label: 'Speciální vyšetrení',
        description:
            'Mimo jiné se zabýváme také léčbou sterility, přípravou pacientek do zařazení IVF programů či dětskou gynekologií.',
    },
]

const Services = () => {
    return (
        <StyledGrid className={classes.root} container spacing={2} id="services">
            {!isMobile && (
                <Grid item xs={12}>
                    <Typography variant={'body2'} align="center">
                        Gynekologie MUDr. Miroslav Vaněk spustila v úterý 5. řijna 2021 nový web.
                        <br />
                        Důvodem byla modernizace objednávacího systému
                        <br />
                        a přehledné zobrazení informací také na mobilních zařízeních.
                        <br />
                        Do 31. října 2021 bude nový web spuštěn v testovacím režimu a bude možné k němu posílat
                        <br />
                        připomínky či dotazy, a to na adresu webmaster@gynekologie-vanek.cz.
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography variant="h3">Naše služby</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="center">
                    {`Naše ambulance nabízí těhotenskou a gynekologickou péči pro ženy ve
                     všech fázích života, od předpubertálních let po postmenopauzální období.`}
                    <br />
                    {`Svým pacientkám chceme dopřát co nejkomplexnější péči, proto nabízíme
                    speciální služby včetně mateřské fetální medicíny, gynekologické
                    onkologie, antikoncepčního poradenství a dalších.`}
                    <br />
                    {`Další informace o tom, jak vám můžeme pomoci, naleznete v níže uvedených službách.`}
                </Typography>
            </Grid>
            {services.map(({ icon, label, description }, index) => (
                <Fade key={label} in timeout={3000 * index}>
                    <Grid xs={12} sm={6} item key={label}>
                        <Service icon={icon} label={label} description={description} />
                    </Grid>
                </Fade>
            ))}
            <Divider variant="middle" />
        </StyledGrid>
    )
}
Services.propTypes = {}

export default Services
