import { Box, Button, ButtonGroup, Grid, makeStyles, Typography } from '@material-ui/core'
import { isMobile } from '@utilities/checkDeviceType'
import isNilOrEmpty from '@utilities/isNilOrEmpty'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAmbulances } from 'src/store/reservationProcess/actions'
import { clearReservation } from 'src/store/reservationProcess/reservationProcessSlice'
import { makeArrayOfValueLabelAmbulances } from 'src/store/reservationProcess/selectors'
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
        height: '60vh',
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
            height: '90vh',
        },
        marginTop: -24,
    },
    firstHeadline: {
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: '68% !important',
        },
    },
    btnsContainer: {
        maxWidth: '100%',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            padding: `${theme.spacing(1)}px !important`,
        },
    },
    btn: {
        '& .MuiButton-label': {
            color: '#FFF',
        },
    },
}))

const selectAmbulancesValueLabelPair = makeArrayOfValueLabelAmbulances()
const LandingWelcome = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const ambulances = useSelector(selectAmbulancesValueLabelPair)

    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
    const [isSonographyInfoOpen, setIsSonographyInfoOpen] = useState(false)

    useEffect(() => {
        if (isNilOrEmpty(ambulances)) dispatch(fetchAmbulances())
    }, [])

    const handleToggleReservationModal = () => {
        setIsReservationModalOpen((prevState) => !prevState)
        if (isReservationModalOpen) dispatch(clearReservation())
    }
    const handleToggleSonoModal = () => setIsSonographyInfoOpen((prevState) => !prevState)

    return (
        <Box className={classes.root}>
            <LandingPageReservationModal isOpen={isReservationModalOpen} onClose={handleToggleReservationModal} />
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.firstHeadline}>
                    <Typography variant={isMobile ? 'h4' : 'h3'}>Vaše zdraví je u nás vždy na prvním místě</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={isMobile ? 'body1' : 'h5'}> Zarezervujte si svůj termín již dnes.</Typography>
                </Grid>
                {/* Own component landing action message buttonGroup */}
                <Grid item container xs={12} spacing={2} className={classes.btnsContainer} justifyContent="flex-start">
                    <Grid item xs={12} md={6}>
                        <ButtonGroup variant="contained" orientation={isMobile ? 'vertical' : 'horizontal'}>
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
                            <Button
                                className={classes.btn}
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={handleToggleSonoModal}
                                fullWidth
                            >
                                <Typography>Termíny sonografie prsou</Typography>
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <SonographyInfoModal open={isSonographyInfoOpen} handleClose={handleToggleSonoModal} />
            </Grid>
        </Box>
    )
}

export default LandingWelcome
