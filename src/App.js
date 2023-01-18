import  ThemeProvider from './contexts/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header';
import MainFooter from './layouts/MainFooter';


function App() {
  return (
    <ThemeProvider>
       <Header />
       <MainFooter />
    </ThemeProvider>
  
  )
}

export default App