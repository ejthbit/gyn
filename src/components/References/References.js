import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Reference from './Reference'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
            textAlign: 'center',
        },
    },
}))
// TODO: get references from DB
const References = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Naši spokojení pacienti</Typography>
            </Grid>
            <Grid item container xs={12} spacing={4}>
                <Grid item container xs={12} md={4}>
                    <Reference
                        text="Je to lékař, který Vám porozumí, žádná nadřazenost, všem doporučuji, děkuji za Vaši péči."
                        author="Alena B."
                    />
                </Grid>
                <Grid item container xs={12} md={4}>
                    <Reference
                        text="Byla jsem zde dnes poprvé na prohlídku, jelikož čekám první ditě, a musím říct, že pan doktor je člověk na správném mistě, pěkné jednání, vše vysvětlí, jsem spokojená i sestřička byla ochotná, super."
                        author="Karin F."
                    />
                </Grid>
                <Grid item container xs={12} md={4}>
                    <Reference
                        text="Kež by bylo více takových odborníků se srdcem na správném mistě. Úžasný lékař, vřele doporučuji."
                        author="Dana R. J."
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
References.propTypes = {}

export default References
