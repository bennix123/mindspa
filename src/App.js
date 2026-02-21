import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';
import HomePage from './pages/HomePage';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;
