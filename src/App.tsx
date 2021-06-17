import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './theme';
import Layout from './layout';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.navy};
    font-family: 'Lato', sans-serif;
  }
`; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>Insert router views here.</Layout>
    </ThemeProvider>
  );
}

export default App;
