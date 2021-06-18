import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import theme from './theme';
import Layout from './layout';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.navy};
    font-family: 'Lato', sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
`; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route path={ROUTES.SIGN_IN}>Sign in!</Route>
            <Route path={ROUTES.TIMER}>Timer!</Route>
            <Route path={ROUTES.DASHBOARD}>Dashboard!</Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
