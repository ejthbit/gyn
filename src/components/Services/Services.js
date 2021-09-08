import { SonographyIcon } from '@assets/SvgIcons'
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Service from './Service'

const services = [
    {
        icon: <SonographyIcon />,
        label: 'Preventivní prohlídky',
        description:
            'Od svých 15 let má každá žena nárok na bezplatnou preventivní prohlídku u gynekologa, a to jedenkrát za rok (po uplynutí 11 měsíců). Prohlídka je přizpůsobena věku ženy a tomu, zda je sexuálně aktivní',
    },
    {
        icon: <SonographyIcon />,
        label: 'Péče o těhotné',
        description:
            'Zajišťujeme péči o budoucí maminky včetně ultrazvuku, krevních testů, pravidelných prohlídek a zprostředkovaně také screening vrozených vývojových vad plodu.',
    },
    {
        icon: <SonographyIcon />,
        label: 'Poradenství',
        description: 'Nabizíme poradenství v oblastech antikoncepce, přechodu a gynekologických potížích',
    },
    {
        icon: <SonographyIcon />,
        label: 'Sonografie prsu',
        description:
            'Sonografické, neboli ultrazvukové vyšetření prsou patří v dnešní době k nejdůležitějším vyšetřovacím praktikám sloužícím k včasnému nálezu rakoviny prsou',
    },
    {
        icon: <SonographyIcon />,
        label: 'Prevence a diagnostika nádorových onemocnění',
        description:
            'Součástí každé preventivní prohlídky je také onkologická cytologie, která pomáhá s včasným záchytem nádorových onemocnění čípku děložního, pochvy, sliznice děložní i zevního genitálu.',
    },
    {
        icon: <SonographyIcon />,
        label: 'Speciální vyšetrení',
        description:
            'Mimo jiné se zabýváme také léčbou sterility, přípravou pacientek do zařazení IVF programů či dětskou gynekologií.',
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '15%',
        paddingRight: '15%',
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
        },
    },
}))

const Services = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2} id="services">
            <Grid item xs={12}>
                <Typography variant="h3">Naše služby</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="center">
                    {`Naše ambulance nabízí těhotenskou a gynekologickou péči pro ženy ve všech fázích života, od
                    předpubertálních let po postmenopauzální roky. Svým pacientkám také nabízíme různé speciální služby,
                    včetně poradenství, mateřské fetální medicíny, gynekologické onkologie a dalších,
                    abychom poskytli co nejkomplexnější péči.`}
                    <br />
                    {`Další informace o tom, jak vám můžeme pomoci, naleznete
                    v níže uvedených službách.`}
                </Typography>
            </Grid>
            {services.map(({ icon, label, description }) => (
                <Grid xs={12} sm={6} item key={label}>
                    <Service icon={icon} label={label} description={description} />
                </Grid>
            ))}
            <Divider variant="middle" />
        </Grid>
    )
}
Services.propTypes = {}

export default Services
