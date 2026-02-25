import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ProblemGrid.css';

const STRESS_IMG =
  'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400';
const RELATIONSHIPS_IMG =
  'https://images.pexels.com/photos/5257587/pexels-photo-5257587.jpeg?auto=compress&cs=tinysrgb&w=400';
const PEACE_IMG =
  'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=500';

const ProblemGrid = () => {
  const [ref1, vis1] = useScrollReveal({ threshold: 0.2 });
  const [ref2, vis2] = useScrollReveal({ threshold: 0.2 });
  const [ref3, vis3] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="problem-grid">
      <div className="problem-grid__container">
        {/* Item 1 - Left: Stress */}
        <div ref={ref1} className={`problem-grid__item problem-grid__item--stress reveal reveal-left ${vis1 ? 'visible' : ''}`}>
          <h3 className="problem-grid__heading">
            Get Rid Of Stress,
            <br />
            Anxiety &amp; Depression!
          </h3>
          <div className="problem-grid__frame problem-grid__frame--rotated-left">
            <img
              src={STRESS_IMG}
              alt="Woman experiencing stress and anxiety"
              className="problem-grid__image"
            />
          </div>
        </div>

        {/* Item 2 - Bottom Left: Relationships */}
        <div ref={ref2} className={`problem-grid__item problem-grid__item--relationships reveal reveal-up ${vis2 ? 'visible' : ''}`}>
          <h3 className="problem-grid__heading">
            Rejuvinate Your
            <br />
            Relationships!
          </h3>
          <div className="problem-grid__frame problem-grid__frame--rotated-right">
            <img
              src={RELATIONSHIPS_IMG}
              alt="Hands together representing relationships"
              className="problem-grid__image"
            />
          </div>
        </div>

        {/* Item 3 - Right: Peace of Mind */}
        <div ref={ref3} className={`problem-grid__item problem-grid__item--peace reveal reveal-right ${vis3 ? 'visible' : ''}`}>
          <h3 className="problem-grid__heading">
            Attain Peace
            <br />
            Of Mind!
          </h3>
          <div className="problem-grid__frame problem-grid__frame--large">
            <img
              src={PEACE_IMG}
              alt="Man in cave landscape representing peace of mind"
              className="problem-grid__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemGrid;
