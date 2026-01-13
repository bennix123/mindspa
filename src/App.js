import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { observeElements } from './utils/animations';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FounderMessage from './components/FounderMessage';
import Services from './components/Services';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import PopularServices from './components/PopularServices';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Quote from './components/Quote';
import Appointment from './components/Appointment';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  useEffect(() => {
    // Initialize scroll animations
    observeElements();
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <FounderMessage />
        <Services />
        <Stats />
        <WhyChooseUs />
        <PopularServices />
        <Team />
        <Testimonials />
        <Blog />
        <Quote />
        <Appointment />
        <Footer />
        <DarkModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;

