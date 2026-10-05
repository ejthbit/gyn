import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type SectionHeadingProps = {
    title: string
    children?: ReactNode
}

// Heading block shared by landing sections; matches the heavy hero headline typography.
const SectionHeading = ({ title, children }: SectionHeadingProps) => (
    <Box sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto', mb: { xs: 4, md: 6 } }}>
        <Typography
            component="h2"
            sx={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
        >
            {title}
        </Typography>
        <Box
            sx={{
                width: 64,
                height: 4,
                borderRadius: 2,
                bgcolor: 'primary.main',
                mx: 'auto',
                mt: 2,
                mb: children ? 3 : 0,
            }}
        />
        {children && (
            <Typography
                component="div"
                sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    '& p': { m: 0 },
                    '& p + p': { mt: 1.5 },
                }}
            >
                {children}
            </Typography>
        )}
    </Box>
)

export default SectionHeading
