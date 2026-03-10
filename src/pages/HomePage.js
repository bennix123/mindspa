import React from 'react';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import AboutSection from '../components/AboutSection';
import StatsCounter from '../components/StatsCounter';
import WhyChooseUs from '../components/WhyChooseUs';
import PopularServices from '../components/PopularServices';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import AppointmentForm from '../components/AppointmentForm';

function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <AboutSection />
      <StatsCounter />
      <WhyChooseUs />
      <PopularServices />
      <Team />
      <Testimonials />
      <Blog />
      <AppointmentForm />
    </>
  );
}

export default HomePage;
