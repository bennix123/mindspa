import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './QuoteBanner.css';

const QuoteBanner = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="quote-banner">
      <div className="container">
        <p ref={ref} className={`quote-banner-text reveal reveal-scale ${isVisible ? 'visible' : ''}`}>
          &ldquo;Begin your journey to a better life with peace, love, and happiness&rdquo;
        </p>
      </div>
    </section>
  );
};

export default QuoteBanner;
