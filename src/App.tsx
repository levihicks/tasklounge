import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      </div>
    </ThemeProvider>
  );
}

export default App;
