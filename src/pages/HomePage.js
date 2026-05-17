import React from 'react';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import AboutSection from '../components/AboutSection';
import WatchVideoSection from '../components/WatchVideoSection';
import StatsCounter from '../components/StatsCounter';

import PopularServices from '../components/PopularServices';
import TrainingPrograms from '../components/TrainingPrograms';
import Team from '../components/Team';
import AwardsCertificates from '../components/AwardsCertificates';
import Blog from '../components/Blog';
import AppointmentForm from '../components/AppointmentForm';

function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <AboutSection />
      <WatchVideoSection />
      <StatsCounter />

      <PopularServices />
      <TrainingPrograms />
      <Team />
      <AwardsCertificates />
      <Blog />
      <AppointmentForm />
    </>
  );
}

export default HomePage;
