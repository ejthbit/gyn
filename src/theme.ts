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
            main: '#0000009c',
        },
    },
    components: {
        // MuiCssBaseline: {
        //     styleOverrides: {
        //         html: {
        //             WebkitFontSmoothing: 'auto',
        //             margin: 0,
        //             padding: 0,
        //             overflowX: 'hidden',
        //             height: '100vh',
        //             width: '100vw',
        //         },
        //         body: {
        //             margin: 0,
        //             padding: 0,
        //             height: '100vh',
        //             width: '100vw',
        //             backgroundColor: '#f8f8f8',
        //         },
        //     },
        // },
        //     MuiTableRow: {
        //         styleOverrides: {
        //             root: {
        //                 '&.Mui-selected': {
        //                     backgroundColor: lighten('#2DAAA3', 0.85),
        //                     '&:hover': {
        //                         backgroundColor: '#0000000a',
        //                     },
        //                 },
        //             },
        //         },
        //     },
        //     MuiButton: {
        //         styleOverrides: {
        //             containedPrimary: {
        //                 color: '#FFF',
        //             },
        //         },
        //     },
        //     MuiFormLabel: {
        //         styleOverrides: {
        //             asterisk: {
        //                 color: '#db3131',
        //                 '&.Mui-error': {
        //                     color: '#db3131',
        //                 },
        //             },
        //         },
        //     },
        //     MuiLink: {
        //         defaultProps: {
        //             underline: 'hover',
        //         },
        //     },
    },
})

export default gynBookingTheme
