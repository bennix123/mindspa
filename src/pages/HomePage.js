import React, { useEffect, useState, useCallback } from 'react';
import { observeElements } from '../utils/animations';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import FounderMessage from '../components/FounderMessage';
import Services from '../components/Services';
import Stats from '../components/Stats';
import WhyChooseUs from '../components/WhyChooseUs';
import PopularServices from '../components/PopularServices';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import ClientPresence from '../components/ClientPresence';
import Blog from '../components/Blog';
import ReelsAndBlogs from '../components/ReelsAndBlogs';
import PodcastHighlight from '../components/PodcastHighlight';
import Quote from '../components/Quote';
import Appointment from '../components/Appointment';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle';
import ScrollToTop from '../components/ScrollToTop';

function HomePage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    observeElements();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="App">
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
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
      <ClientPresence />
      <Blog />
      <ReelsAndBlogs />
      <PodcastHighlight />
      <Quote />
      <Appointment />
      <Footer />
      <DarkModeToggle />
      <ScrollToTop />
    </div>
  );
}

export default HomePage;
