import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import { theme } from './helpers/theme';
import { LayoutProvider } from './contexts/layoutContext';
import { UserProvider } from './contexts/userContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </LayoutProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
