import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './QuoteSimple.css';

const QuoteSimple = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="quote-simple">
      <div ref={ref} className={`quote-simple__container reveal reveal-up ${isVisible ? 'visible' : ''}`}>
        <div className="quote-simple__line" aria-hidden="true" />
        <p className="quote-simple__text">
          &ldquo;Be equal minded in both success and failure.&rdquo;
        </p>
        <div className="quote-simple__line quote-simple__line--bottom" aria-hidden="true" />
      </div>
    </section>
  );
};

export default QuoteSimple;
