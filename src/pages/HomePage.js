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
import WaveDivider from '../components/WaveDivider';

function HomePage() {
  return (
    <>
      <Hero />
      <WaveDivider color="#b8bcc0" />
      <ProblemGrid />
      <WaveDivider color="#f7f9fb" />
      <FeatureCards />
      <WaveDivider color="#ffffff" />
      <FounderMessage />
      <AboutPreview />
      <Blog />
      <WaveDivider color="#1a1a2e" />
      <Testimonials />
      <QuoteBanner />
      <WaveDivider color="#ffffff" />
      <Steps />
      <GetHelpWith />
      <Gallery />
      <ServicesSection />
      <QuoteSimple />
    </>
  );
}

export default HomePage;
