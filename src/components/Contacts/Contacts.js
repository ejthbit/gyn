import { Grid, makeStyles, Typography } from '@material-ui/core'
import Contact from './Contact'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'block',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        whiteSpace: 'pre-wrap',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
            textAlign: 'center',
        },
    },
}))
const ordinances = [
    {
        name: 'Ambulance Frýdek-Místek',
        contact: { email: 'kamilasebestova@centrum.cz', phone: '558 632 133' },
        openingHours: [
            { day: 'Pondělí', hours: '7:00 - 18:00' },
            { day: 'Úterý', hours: '16:00 - 19:00' },
            { day: 'Středa', hours: '7:00 - 12:00' },
            { day: 'Čtvrtek', hours: '7:00 - 12:00' },
            { day: 'Pátek', hours: '7:00 - 13:00' },
        ],
        address: { city: 'Frýdek-Místek', street: 'tř.T.G.Masaryka 602', postalCode: '738 01' },
        map: (
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.5293323642773!2d18.353524115596183!3d49.682003950315234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQwJzU1LjIiTiAxOMKwMjEnMjAuNiJF!5e0!3m2!1sen!2scz!4v1629038507858!5m2!1sen!2scz"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
            ></iframe>
        ),
    },
    {
        name: 'Ambulance Šenov',
        contact: { email: 'ordinacesenov@seznam.cz', phone: '605 414 988' },
        openingHours: [
            { day: 'Úterý', hours: '7:00 - 17:00' },
            { day: 'Čtvrtek', hours: '12:00 - 16:00' },
        ],
        address: { city: 'Šenov, Ostrava-Město', street: 'Vraclavská 1281', postalCode: '739 34' },
        map: (
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2576.010307117633!2d18.3713434!3d49.7858711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQ3JzA5LjEiTiAxOMKwMjInMTYuOCJF!5e0!3m2!1sen!2scz!4v1629038303689!5m2!1sen!2scz"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
            ></iframe>
        ),
    },
]
const Contacts = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Kontakty</Typography>
                <Grid container spacing={4}>
                    {ordinances.map((ordinance) => (
                        <Grid key={ordinance.name} item xs={12} md={6}>
                            <Contact {...ordinance} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
Contacts.propTypes = {}

export default Contacts
