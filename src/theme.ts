import { createTheme, darken, lighten } from '@mui/material'

const theme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#86a5a5',
        },
        secondary: {
            main: '#11cb5f',
        },
        text: {
            primary: '#292c47',
            secondary: '#FFF',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    WebkitFontSmoothing: 'auto',
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                    height: '100vh',
                    width: '100vw',
                    boxSizing: 'unset',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#f8f8f8',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&$selected': {
                        backgroundColor: lighten('#2DAAA3', 0.85),
                        '&:hover': {
                            backgroundColor: '#0000000a',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: '#FFF',
                    backgroundColor: '#86a5a5',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: darken('#86a5a5', 0.2),
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#db3131',
                    '&$error': {
                        color: '#db3131',
                    },
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'hover',
            },
        },
    },
})
export default theme
