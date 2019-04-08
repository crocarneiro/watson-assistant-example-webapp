import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import './index.css';
import App from "./App.jsx";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
, document.getElementById('root'));