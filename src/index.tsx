import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {createTheme} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const theme = createTheme({
    typography: {
        fontFamily: [
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    }
})

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
)
