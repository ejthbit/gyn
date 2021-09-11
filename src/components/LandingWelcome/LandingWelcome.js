import { Box, Button, Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import { isMobile } from '@utilities/checkDeviceType'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearReservation } from 'src/store/reservationProcess/reservationProcessSlice'
import LandingPageImg from '../../assets/landingImg.jpg'
import LandingMobileImg from '../../assets/landingMobile.png'
import LandingPageReservationModal from './LandingPageReservationModal'

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
        '& span': {
            color: theme.palette.primary.main,
        },
        paddingRight: '68% !important',
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
        if (isReservationModalOpen) dispatch(clearReservation())
    }

    return (
        <Box className={classes.root}>
            <LandingPageReservationModal isOpen={isReservationModalOpen} onClose={handleToggleReservationModal} />
            <Grid container spacing={2}>
                <Hidden xsDown>
                    <Grid item xs={12} className={classes.firstHeadline}>
                        <Typography variant="h3">
                            Vaše zdraví je u nás vždy na prvním <span>místě</span>
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={12}>
                    <Typography variant={isMobile ? 'h3' : 'h5'}> Zarezervujte si svůj termín již dnes.</Typography>
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
