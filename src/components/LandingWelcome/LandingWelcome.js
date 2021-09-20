import { Box, Button, Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import { isMobile } from '@utilities/checkDeviceType'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearReservation } from 'src/store/reservationProcess/reservationProcessSlice'
import LandingPageImg from '../../assets/landingImg.jpg'
import LandingMobileImg from '../../assets/landingMobile.png'
import LandingPageReservationModal from './LandingPageReservationModal'
import SonographyInfoModal from './SonographyInfoModal'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 430,
        backgroundImage: `url(${LandingPageImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '70vh',
        paddingLeft: '5%',
        paddingRight: 20,
        paddingTop: 100,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            paddingLeft: '5% !important',
            paddingRight: '5% !important',
            paddingTop: 50,
            backgroundImage: `url(${LandingMobileImg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            fontStyle: 'italic',
            minHeight: 280,
            height: '100vh',
        },
        marginTop: -24,
    },
    firstHeadline: {
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
        paddingRight: '68% !important',
    },
    btnsContainer: {
        paddingRight: '60% !important',
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(1)}px !important`,
        },
    },
    btn: {
        maxWidth: 300,
        '& .MuiButton-label': {
            color: '#FFF',
        },
    },
}))

const LandingWelcome = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
    const [isSonographyInfoOpen, setIsSonographyInfoOpen] = useState(false)

    const handleToggleReservationModal = () => {
        setIsReservationModalOpen((prevState) => !prevState)
        if (isReservationModalOpen) dispatch(clearReservation())
    }
    const handleToggleSonoModal = () => setIsSonographyInfoOpen((prevState) => !prevState)

    return (
        <Box className={classes.root}>
            <LandingPageReservationModal isOpen={isReservationModalOpen} onClose={handleToggleReservationModal} />
            <Grid container spacing={2}>
                <Hidden xsDown>
                    <Grid item xs={12} className={classes.firstHeadline}>
                        <Typography variant="h3">Vaše zdraví je u nás vždy na prvním místě</Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={12}>
                    <Typography variant={isMobile ? 'h3' : 'h5'}> Zarezervujte si svůj termín již dnes.</Typography>
                </Grid>
                <Grid item container xs={12} spacing={2} className={classes.btnsContainer} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Button
                            className={classes.btn}
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={handleToggleReservationModal}
                            fullWidth
                        >
                            <Typography>Objednat se</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            className={classes.btn}
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={handleToggleSonoModal}
                            fullWidth
                        >
                            <Typography>Termíny sonografie</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <SonographyInfoModal open={isSonographyInfoOpen} handleClose={handleToggleSonoModal} />
            </Grid>
        </Box>
    )
}

export default LandingWelcome
