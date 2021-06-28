import { createMuiTheme } from '@material-ui/core'

const gynBookingTheme = createMuiTheme({
    overrides: {
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
