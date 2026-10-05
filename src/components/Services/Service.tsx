import { Box, Typography } from '@mui/material'
import { alpha, lighten, styled } from '@mui/material/styles'
import React, { ReactElement } from 'react'

type ServiceProps = {
    icon: ReactElement
    label: string
    description: string
}

const PREFIX = 'Service'
const classes = {
    root: `${PREFIX}-root`,
    icon: `${PREFIX}-icon`,
}

const Root = styled('article')(({ theme }) => ({
    [`&.${classes.root}`]: {
        height: '100%',
        padding: theme.spacing(4),
        borderRadius: theme.spacing(3),
        backgroundColor: lighten(theme.palette.primary.main, 0.94),
        wordBreak: 'break-word',
        transition: theme.transitions.create(['transform', 'box-shadow']),
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        [theme.breakpoints.down('sm')]: { padding: theme.spacing(3) },
    },
    [`& .${classes.icon}`]: {
        display: 'grid',
        placeItems: 'center',
        width: 72,
        height: 72,
        marginBottom: theme.spacing(2.5),
        borderRadius: '50%',
        backgroundColor: theme.palette.common.white,
        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.12)}`,
        '& svg': { width: 44, height: 44 },
    },
}))

const Service = ({ icon, label, description }: ServiceProps) => (
    <Root className={classes.root}>
        <Box className={classes.icon}>{icon}</Box>
        <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.3, mb: 1 }}>
            {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
    </Root>
)

export default Service
