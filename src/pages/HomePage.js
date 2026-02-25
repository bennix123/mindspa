import React from 'react';
import Hero from '../components/Hero';
import ProblemGrid from '../components/ProblemGrid';
import FeatureCards from '../components/FeatureCards';
import FounderMessage from '../components/FounderMessage';
import AboutPreview from '../components/AboutPreview';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';
import QuoteBanner from '../components/QuoteBanner';
import Steps from '../components/Steps';
import GetHelpWith from '../components/GetHelpWith';
import Gallery from '../components/Gallery';
import ServicesSection from '../components/ServicesSection';
import QuoteSimple from '../components/QuoteSimple';

function HomePage() {
  return (
    <>
      <Hero />
      <ProblemGrid />
      <FeatureCards />
      <FounderMessage />
      <AboutPreview />
      <Blog />
      <Testimonials />
      <QuoteBanner />
      <Steps />
      <GetHelpWith />
      <Gallery />
      <ServicesSection />
      <QuoteSimple />
    </>
  );
}

export default HomePage;
