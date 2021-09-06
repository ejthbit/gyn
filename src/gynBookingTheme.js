import { createTheme } from '@material-ui/core'

const gynBookingTheme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#2DAAA3',
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
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                },
                body: {
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
        MuiButton: {
            containedPrimary: {
                color: '#FFF',
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
