import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { DotGrid, ShapeLines } from './DecorativePatterns';
import CurriculumContent from './CurriculumContent';
import './TrainingPrograms.css';

const upcomingPrograms = [
  {
    title: 'Psychology of Self Talk',
    subtitle: 'For Health, Happiness and Success',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
      </svg>
    ),
  },
  {
    title: 'Pranayams for Emotional Healing',
    subtitle: 'Breathwork & Inner Balance',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
  },
  {
    title: 'Chakra & Energy Balancing',
    subtitle: 'Align Your Energy Centers',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    title: 'Unlimited Rocking Life',
    subtitle: 'Unlock Your Full Potential',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'Self Hypnosis',
    subtitle: 'Master Your Subconscious Mind',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Law of Attraction',
    subtitle: 'Manifest Your Dream Reality',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

const TrainingPrograms = () => {
  const [sectionRef, sectionVis] = useScrollReveal();
  const [gridTitleRef, gridTitleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 120, childSelector: '.training-programs__program' });
  const [curriculumOpen, setCurriculumOpen] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (curriculumOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [curriculumOpen]);

  return (
    <>
    <section className="training-programs">
      <ShapeLines style={{ top: '30px', left: '20px' }} />
      <DotGrid style={{ bottom: '40px', right: '30px' }} rows={4} cols={4} />
      <div className="container">
        {/* Featured CHI-USA Course */}
        <div ref={sectionRef} className={`training-programs__inner ${sectionVis ? 'visible' : ''}`}>
          <div className="training-programs__image">
            <img src="/client-pic/23.jpeg" alt="CHI-USA Certified Training Program" />
            <div className="training-programs__badge">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
              </svg>
              <span>Certified</span>
            </div>
          </div>
          <div className="training-programs__content">
            <p className="section-label">Learn &amp; Grow</p>
            <h2 className="section-title">Our Upcoming Specialized Training Programs</h2>
            <div className="training-programs__card">
              <div className="training-programs__card-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
                </svg>
              </div>
              <div className="training-programs__card-body">
                <h3>Diploma Course in Clinical Hypnotherapy</h3>
                <p className="training-programs__cert">
                  California Hypnosis Institute &mdash; USA Certified
                </p>
                <p className="training-programs__desc">
                  A comprehensive, internationally recognized certification program designed for aspiring practitioners to master clinical hypnotherapy techniques with CHI-USA aligned standards and hands-on supervised practice.
                </p>
                <ul className="training-programs__highlights">
                  <li>Internationally recognized certification</li>
                  <li>Hands-on supervised clinical practice</li>
                  <li>Comprehensive curriculum &amp; study materials</li>
                  <li>Expert mentorship from certified professionals</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setCurriculumOpen(true)}
                  className="btn-primary training-programs__cta"
                >
                  Explore Courses
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Programs Grid */}
        <div ref={gridTitleRef} className={`training-programs__grid-header ${gridTitleVis ? 'visible' : ''}`}>
          <h3 className="training-programs__grid-title">More Upcoming Programs</h3>
          <div className="training-programs__grid-line" />
        </div>

        <div className="training-programs__grid" ref={gridRef}>
          {upcomingPrograms.map((program, index) => (
            <div key={index} className="training-programs__program stagger-item">
              <div className="training-programs__program-icon">
                {program.icon}
              </div>
              <div className="training-programs__program-text">
                <h4>{program.title}</h4>
                <p>{program.subtitle}</p>
              </div>
              <div className="training-programs__program-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {curriculumOpen && ReactDOM.createPortal(
      <div
        className="curriculum-modal"
        onClick={(e) => { if (e.target === e.currentTarget) setCurriculumOpen(false); }}
      >
        <div className="curriculum-modal__card">
          <button
            className="curriculum-modal__close"
            onClick={() => setCurriculumOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="curriculum-modal__body">
            <CurriculumContent showHeading={true} ctaTo="/contact" />
          </div>
        </div>

        <style>{`
          .curriculum-modal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: clamp(8px, 3vw, 24px);
            animation: curriculumModalFade 0.25s ease;
          }
          @keyframes curriculumModalFade {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .curriculum-modal__card {
            background: #fff;
            width: 100%;
            max-width: 1100px;
            max-height: 92vh;
            border-radius: 14px;
            position: relative;
            box-shadow: 0 24px 80px rgba(0,0,0,0.3);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: curriculumModalSlide 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes curriculumModalSlide {
            from { opacity: 0; transform: translateY(30px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .curriculum-modal__close {
            position: absolute;
            top: 16px;
            right: 18px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(0,0,0,0.06);
            border: none;
            color: #333;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
            z-index: 2;
          }
          .curriculum-modal__close:hover {
            background: rgba(0,0,0,0.12);
          }
          .curriculum-modal__body {
            padding: 32px clamp(20px, 4vw, 44px) 40px;
            overflow-y: auto;
          }
        `}</style>
      </div>,
      document.body
    )}
    </>
  );
};

export default TrainingPrograms;
