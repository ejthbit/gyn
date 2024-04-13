import { Box, Button, ButtonGroup, Grid, Slide, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isMobile } from '@utilities/checkDeviceType'
import React from 'react'
import LandingPageImg from '../../assets/landingImg.jpg'
import LandingMobileImg from '../../assets/landingMobile.png'

const PREFIX = 'LandingWelcome'

const classes = {
    root: `${PREFIX}-root`,
    firstHeadline: `${PREFIX}-firstHeadline`,
    btnsContainer: `${PREFIX}-btnsContainer`,
    btn: `${PREFIX}-btn`,
}

const Root = styled(Box)(({ theme }) => ({
    [`&.${classes.root}`]: {
        minHeight: 430,
        backgroundImage: `url(${LandingPageImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '60vh',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: 100,
        [theme.breakpoints.down('sm')]: {
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

    [`& .${classes.firstHeadline}`]: {
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: '68% !important',
        },
    },

    [`& .${classes.btnsContainer}`]: {
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: `${theme.spacing(1)} !important`,
        },
    },

    [`& .${classes.btn}`]: {
        '& .MuiButton-label': {
            color: '#FFF',
        },
    },
}))

const LandingWelcome = () => {
    return (
        <Root className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.firstHeadline}>
                    <Typography variant={isMobile ? 'h4' : 'h3'}>Vaše zdraví je u nás vždy na prvním místě</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="textSecondary" variant={isMobile ? 'body1' : 'h5'}>
                        Zarezervujte si svůj termín již dnes.
                    </Typography>
                </Grid>
                {/* Own component landing action message buttonGroup */}
                <Grid item container xs={12} spacing={2} className={classes.btnsContainer} justifyContent="flex-start">
                    <Grid item xs={12} md={6}>
                        <Slide direction="right" in mountOnEnter unmountOnExit timeout={700}>
                            <ButtonGroup variant="contained" orientation={isMobile ? 'vertical' : 'horizontal'}>
                                <Button
                                    className={classes.btn}
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                >
                                    <Typography>Objednat se</Typography>
                                </Button>
                            </ButtonGroup>
                        </Slide>
                    </Grid>
                </Grid>
            </Grid>
        </Root>
    )
}

export default LandingWelcome
