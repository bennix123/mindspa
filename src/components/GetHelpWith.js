import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './GetHelpWith.css';

const CONDITIONS = [
  { text: 'Stress, Anxiety & Depression', color: 'orange' },
  { text: 'Depression', color: 'teal' },
  { text: 'Relationships Issues', color: 'orange' },
  { text: 'OCD, Bipolar Disorder', color: 'teal' },
  { text: 'Eating & Sleeping Disorder', color: 'orange' },
  { text: 'Trauma, Grief & Anger Issues', color: 'teal' },
  { text: 'Sexuality, Old Age, Marital Issues', color: 'orange' },
  { text: 'Other Disorder, Addiction & Self Enhancement', color: 'teal' },
];

const GetHelpWith = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const treeRef = useStaggerReveal({ staggerDelay: 100, childSelector: '.get-help__item' });

  return (
    <section className="get-help">
      <div className="get-help__container">
        <div className="get-help__dots" aria-hidden="true">
          &#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;
        </div>

        <div ref={titleRef} className={`reveal reveal-up ${titleVis ? 'visible' : ''}`}>
          <h2 className="get-help__title">Get Help With</h2>
          <div className="get-help__divider">
            <span className="dot" />
            <span className="line" />
            <span className="dot" />
          </div>
        </div>

        <div className="get-help__tree" ref={treeRef}>
          {CONDITIONS.map((item, index) => (
            <div className="get-help__item stagger-item" key={index}>
              <span
                className={`get-help__marker get-help__marker--${item.color}`}
                aria-hidden="true"
              />
              <span className="get-help__text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetHelpWith;
