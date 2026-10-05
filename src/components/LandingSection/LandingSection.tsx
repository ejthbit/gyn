import { styled } from '@mui/material/styles'

// Centered content column with the vertical rhythm shared by landing page sections.
const LandingSection = styled('section')(({ theme }) => ({
    maxWidth: 1200,
    margin: '0 auto',
    padding: theme.spacing(0, '5%', 12),
    [theme.breakpoints.down('md')]: { paddingBottom: theme.spacing(8) },
}))

export default LandingSection
