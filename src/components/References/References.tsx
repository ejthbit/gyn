import LandingSection from '@components/LandingSection/LandingSection'
import SectionHeading from '@components/LandingSection/SectionHeading'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import Reference from './Reference'

const PREFIX = 'References'
const classes = { grid: `${PREFIX}-grid` }

const Root = styled(LandingSection)(({ theme }) => ({
    [`& .${classes.grid}`]: {
        display: 'grid',
        gap: theme.spacing(3),
        gridTemplateColumns: 'repeat(3, 1fr)',
        [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
    },
}))

const references = [
    {
        text: 'Je to lékař, který Vám porozumí, žádná nadřazenost, všem doporučuji, děkuji za Vaši péči.',
        author: 'Alena B.',
    },
    {
        text: 'Byla jsem zde dnes poprvé na prohlídku, jelikož čekám první ditě, a musím říct, že pan doktor je člověk na správném mistě, pěkné jednání, vše vysvětlí, jsem spokojená i sestřička byla ochotná, super.',
        author: 'Karin F.',
    },
    {
        text: 'Kež by bylo více takových odborníků se srdcem na správném mistě. Úžasný lékař, vřele doporučuji.',
        author: 'Dana R. J.',
    },
]

const References = () => (
    <Root>
        <SectionHeading title="Naši spokojení pacienti" />
        <Box className={classes.grid}>
            {references.map(({ text, author }) => (
                <Reference key={author} text={text} author={author} />
            ))}
        </Box>
    </Root>
)

export default References
