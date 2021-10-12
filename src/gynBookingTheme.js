import { createTheme, lighten } from '@mui/material'

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
        MuiPickersCalendar: {
            styleOverrides: {
                transitionContainer: {
                    marginBottom: 12,
                },
            },
        },
        MuiPickersSlideTransition: {
            styleOverrides: {
                transitionContainer: {
                    marginBottom: 12,
                },
            },
        },
        MuiPickersModal: {
            styleOverrides: {
                dialogRoot: {
                    '& .MuiDialogActions-root': {
                        display: `none !important`,
                    },
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
                },
            },
        },
        MuiMonthPicker: {
            styleOverrides: {
                root: {
                    '& button': {
                        backgroundColor: '#FFF',
                        border: 'none',
                        '&:hover': {
                            backgroundColor: lighten('#1f7672', 0.7),
                        },
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
    },
})
export default gynBookingTheme
