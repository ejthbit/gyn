import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Service from './Service'

const services = [
    {
        icon: <></>,
        label: 'Preventivní prohlídky',
        description:
            'Od svých 15 let má každá žena nárok na bezplatnou preventivní prohlídku u gynekologa, a to jedenkrát za rok (po uplynutí 11 měsíců). Prohlídka je přizpůsobena věku ženy a tomu, zda je sexuálně aktivní',
    },
    { icon: <></>, label: 'Péče o těhotné', description: 'lorem ipsum' },
    {
        icon: <></>,
        label: 'Poradenství',
        description: 'Nabizíme poradenství v oblastech antikoncepce, přechodu a gynekologických potížích',
    },
    {
        icon: <></>,
        label: 'Sonografie prsu',
        description:
            'Sonografické, neboli ultrazvukové vyšetření prsou patří v dnešní době k nejdůležitějším vyšetřovacím praktikám sloužícím k včasnému nálezu rakoviny prsou',
    },
    {
        icon: <></>,
        label: 'Gynefix',
        description:
            'Nehormonální nitroděložní tělísko bez pevného plastového těla a ramének, které má díky svému inovativnímu designu a způsobu zavádění méně vedlejších nežádoucích účinků než klasická tělíska a je proto vhodné pro většinu žen včetně těch, které ještě nerodily',
    },
    {
        icon: <></>,
        label: 'Speciální gynekologické vyšetrení',
        description: '',
    },
]
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10%',
        paddingRight: '10%',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
        },
    },
}))
const Services = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2} id="sluzby">
            <Grid item xs={12}>
                <Typography variant="h2">Naše služby</Typography>
            </Grid>
            {services.map(({ icon, label, description }) => (
                <Grid xs={12} sm={6} item key={label}>
                    <Service icon={icon} label={label} description={description} />
                </Grid>
            ))}
        </Grid>
    )
}
Services.propTypes = {}

export default Services
