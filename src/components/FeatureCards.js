import React from 'react';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import './FeatureCards.css';

const FAMILY_IMG =
  'https://images.pexels.com/photos/1683975/pexels-photo-1683975.jpeg?auto=compress&cs=tinysrgb&w=600';
const COUPLE_IMG =
  'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=600';

const cards = [
  {
    image: FAMILY_IMG,
    alt: 'Family silhouette at sunset',
    text: "Personal Psychologist For Your Family's Health & Happiness.",
  },
  {
    image: COUPLE_IMG,
    alt: 'Couple holding hands',
    text: 'Understand Your Partner & Get Psycho-Kundali Made.',
  },
];

const FeatureCards = () => {
  const staggerRef = useStaggerReveal({ staggerDelay: 200 });

  return (
    <section className="feature-cards">
      <div className="feature-cards__container" ref={staggerRef}>
        {cards.map((card, index) => (
          <div key={index} className="feature-cards__card stagger-item hover-lift">
            <div className="feature-cards__image-wrap hover-zoom">
              <img
                src={card.image}
                alt={card.alt}
                className="feature-cards__image"
              />
            </div>
            <div className="feature-cards__body">
              <p className="feature-cards__text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
