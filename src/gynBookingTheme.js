import { createTheme, lighten } from '@material-ui/core'

const gynBookingTheme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#1f7672',
        },
        secondary: {
            main: '#11cb5f',
        },
        primaryText: {
            main: '#292c47',
        },
        textSecondary: {
            main: '#FFF',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
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
        MuiPickersCalendar: {
            transitionContainer: {
                marginBottom: 12,
            },
        },
        MuiPickersSlideTransition: {
            transitionContainer: {
                marginBottom: 12,
            },
        },
        MuiPickersModal: {
            dialogRoot: {
                '& .MuiDialogActions-root': {
                    display: `none !important`,
                },
            },
        },
        MuiTableRow: {
            root: {
                '&$selected': {
                    backgroundColor: lighten('#2DAAA3', 0.85),
                    '&:hover': {
                        backgroundColor: '#0000000a',
                    },
                },
            },
        },
        MuiButton: {
            containedPrimary: {
                color: '#FFF',
            },
        },
        MuiDivider: {
            root: {
                width: '100%',
            },
        },
        MuiFormLabel: {
            asterisk: {
                color: '#db3131',
                '&$error': {
                    color: '#db3131',
                },
            },
        },
    },
})
export default gynBookingTheme
