import { TransparentLogo, routes } from '../'
import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from '@tanstack/react-router'
import { equals } from 'ramda'
import React from 'react'
import { scrollElementIntoView } from '../../utils'

const PREFIX = 'Footer'

const classes = {
    root: `${PREFIX}-root`,
    menuItemContainer: `${PREFIX}-menuItemContainer`,
    menuItem: `${PREFIX}-menuItem`,
    logoContainer: `${PREFIX}-logoContainer`,
    copyright: `${PREFIX}-copyright`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    [`&.${classes.root}`]: {
        background: theme.palette.primary.main,
        color: 'white',
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(3),
        '& .MuiDivider-root': {
            backgroundColor: 'grey',
        },
    },

    [`& .${classes.menuItemContainer}`]: {
        marginBottom: theme.spacing(1),
    },

    [`& .${classes.menuItem}`]: {
        '& a': {
            color: theme.palette.common.white,
            textDecoration: 'none',
            '&:hover': {
                color: '#000',
                borderBottom: '1px solid black',
            },
        },
        '& svg': {
            paddingTop: theme.spacing(0.5),
            height: 27,
        },
    },

    [`& .${classes.logoContainer}`]: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(8),
        float: 'right',
        '& svg': {
            width: '100%',
            maxWidth: 300,
        },
    },

    [`& .${classes.copyright}`]: {
        textAlign: 'center',
    },
}))

const Footer = () => {
    return (
        <StyledGrid className={classes.root} container spacing={2} justifyContent="center">
            <Grid item container xs={12} spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <Typography variant="body1" color="white" fontWeight="bold">
                        MUDr. Miroslav Vaněk
                        <br />
                        Gynekologická ambulance s.r.o.
                        <br />
                        <br />
                    </Typography>
                    <Typography variant="body2">
                        Pobočka Frýdek-Místek
                        <br />
                        tř. T. G. Masaryka 602, 738 01 Frýdek-Místek
                        <br />
                        +420 558 632 133
                        <br />
                        <br />
                        Pobočka Šenov
                        <br />
                        Vráclavská 1281, 739 34 Šenov
                        <br />
                        +420 605 414 988
                    </Typography>
                </Grid>

                <Grid item xs={12} md={1}>
                    <Typography variant="body1" color="white" fontWeight="bold" className={classes.menuItemContainer}>
                        Mapa webu
                    </Typography>
                    {routes.map(
                        ({ text, link }) =>
                            equals(typeof text, 'string') && (
                                <Grid key={link} item className={classes.menuItemContainer}>
                                    <Typography variant="body2" className={classes.menuItem}>
                                        <Link hash={link} onScroll={(e) => scrollElementIntoView(e, 'smooth')}>
                                            {text}
                                        </Link>
                                    </Typography>
                                </Grid>
                            )
                    )}
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box className={classes.logoContainer}>
                        <TransparentLogo />
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.copyright}>
                <Typography variant="caption">
                    {`Copyright © ${new Date().getFullYear()} ejthbit. All rights reserved.`}
                </Typography>
            </Grid>
        </StyledGrid>
    )
}

export default Footer
