import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
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
        contact: { email: 'kamilasebestova@centrum.cz', phone: '558 632 133' },
        openingHours: [
            { day: 'Pondělí', hours: '7:00 - 18:00' },
            { day: 'Úterý', hours: '16:00 - 19:00' },
            { day: 'Středa', hours: '7:00 - 12:00' },
            { day: 'Čtvrtek', hours: '7:00 - 12:00' },
            { day: 'Pátek', hours: '7:00 - 13:00' },
        ],
        address: { city: 'Frýdek-Místek', street: 'tř.T.G.Masaryka 602', postalCode: '738 01' },
    },
    {
        contact: { email: 'ordinacesenov@seznam.cz', phone: '605 414 988' },
        openingHours: [
            { day: 'Úterý', hours: '7:00 - 17:00' },
            { day: 'Čtvrtek', hours: '12:00 - 16:00' },
        ],
        address: { city: 'Šenov, Ostrava-Město', street: 'Vraclavská 1281', postalCode: '739 34' },
    },
]
const Contacts = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Kontakty</Typography>
                <p>
                    {ordinances.map(
                        (ordinance) =>
                            `Email: ${ordinance.contact.email}\nTelefon: ${
                                ordinance.contact.phone
                            }\nOtevírací hodiny: ${ordinance.openingHours.map((day) => day.day + ' ' + day.hours)}\n\n`
                    )}
                </p>
            </Grid>
        </Grid>
    )
}
Contacts.propTypes = {}

export default Contacts
