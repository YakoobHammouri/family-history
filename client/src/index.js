import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './Theme/MaterialTheme';
import './Theme/Css/index.css';
import * as serviceWorker from './serviceWorker';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
ReactDOM.render(
  <MuiThemeProvider theme={theme()}>
    <React.StrictMode>
      <StylesProvider jss={jss}>
        <Grid container direction="column">
          <App />
        </Grid>
      </StylesProvider>
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
