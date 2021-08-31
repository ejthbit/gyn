import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearReservation } from 'src/store/reservationProcess/reservationProcessSlice'
import LandingPageImg from '../../assets/LandingPage.jpg'
import LandingPageReservationModal from './LandingPageReservationModal'

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '430px',
        backgroundImage: `url(${LandingPageImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '70vh',
        paddingLeft: '10%',
        paddingRight: 20,
        paddingTop: 100,
        marginTop: -40,
    },
    firstHeadline: {
        fontWeight: 'bold',
    },
    btn: {
        '& .MuiButton-label': {
            color: '#FFF',
        },
    },
}))

const LandingWelcome = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)

    const handleToggleReservationModal = () => {
        setIsReservationModalOpen((prevState) => !prevState)
        dispatch(clearReservation())
    }

    return (
        <Box className={classes.root}>
            <LandingPageReservationModal isOpen={isReservationModalOpen} onClose={handleToggleReservationModal} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.firstHeadline} variant="h3">
                        Vaše zdraví je u nás vždy
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.firstHeadline} variant="h3">
                        na prvním místě
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4"> Zarezervujte si svůj termín již dnes.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className={classes.btn}
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={handleToggleReservationModal}
                    >
                        <Typography>Objednat se</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LandingWelcome
