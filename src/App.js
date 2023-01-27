import  ThemeProvider from './contexts/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Router from './routes/Router';
import "./App.css";



function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>     
      </ThemeProvider>
    </BrowserRouter>
  
  )
}

export default App;