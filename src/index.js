import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import csLocale from 'date-fns/locale/cs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store/store'

ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={csLocale}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
)
