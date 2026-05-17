import React from 'react';
import { Link } from 'react-router-dom';

const LEVELS = [
  {
    id: 'level-1',
    label: 'Level I',
    title: 'Introduction to Clinical Hypnotherapy',
    intro:
      'This foundational module provides a deep dive into the principles of Hypnotherapy, combined with essential hypnotherapy techniques to amplify the healing process.',
    topics: [
      ['Introduction to Clinical Hypnotherapy', 'Understand how hypnosis complements therapeutic practice'],
      ['Brief History of Hypnosis', 'Explore the origins and evolution of hypnosis in therapeutic settings.'],
      ['History and Development of the Human Mind', 'Learn how belief systems and behaviors are formed and inherited.'],
      ['The Theory of Mind', 'Discover how the conscious and subconscious interact to influence emotions and actions.'],
      ['How to Create the Hypnotic State', 'Master techniques to guide clients into a receptive, healing state.'],
      ['The Theory of Suggestibility', 'Understand how individuals respond to suggestions during hypnosis.'],
      ['The Laws of Suggestibility', 'Learn the principles that shape effective, lasting therapeutic suggestions.'],
      ['How to Conduct a Hypnosis Session', 'Get step-by-step guidance on running effective sessions.'],
      ['Deepening Techniques', 'Explore methods to enhance the hypnotic state for deeper healing.'],
      ['Wording of Effective Suggestions', 'Craft powerful, transformative suggestions for clients.'],
      ['Post-Hypnotic Suggestions for Re-Hypnosis', 'Plant lasting, positive suggestions that influence the subconscious.'],
      ['Awakening Techniques', 'Safely guide clients back to full awareness, ensuring they feel grounded and refreshed.'],
      ['Self-Hypnosis', 'Teach clients how to harness self-hypnosis for ongoing emotional balance.'],
    ],
    duration: '20 hours',
    cert: 'Master Hypnotist',
    prereq: 'Preferably Graduate',
  },
  {
    id: 'level-2',
    label: 'Level II',
    title: 'Advanced Techniques and Modalities',
    intro:
      'This module builds on the basics, diving into advanced therapeutic techniques and specialized healing modalities.',
    topics: [
      ['Hypnotic Modalities', 'Explore different approaches to hypnosis for varied client needs.'],
      ['Basics of Ericksonian and Kappasinian Hypnosis', 'Understand these influential hypnosis styles.'],
      ['Introduction to Neuro-Linguistic Programming (NLP)', 'Learn how language patterns influence behavior.'],
      ['Introduction to Handwriting Analysis', 'Decode personality traits and emotional states through handwriting.'],
      ['Hypnotic Regression (Age & Past Life Regression)', 'Guide clients to explore and resolve past emotional blockages.'],
      ['Dream Therapy and Interpretation', 'Use dreams to uncover subconscious conflicts and insights.'],
      ['Fear & Phobia Management', 'Empower clients to overcome deep-seated fears and anxieties.'],
      ['Emotional Empowerment Technique', 'Facilitate emotional breakthroughs and self-empowerment.'],
      ['Medical Model of Hypnosis', 'Learn hypnosis applications in pain management and physical healing.'],
      ['Child Hypnosis', 'Adapt techniques for effective work with children.'],
      ['Hypno-Diagnostic Tools', 'Use specialized tools to assess emotional blockages.'],
      ['Hypno-Drama', 'Guide clients through role-playing to resolve inner conflicts.'],
    ],
    duration: '40 hours',
    cert: 'Master Hypnotherapist',
    prereq: 'Level I + Test cleared for Level I',
  },
  {
    id: 'level-3',
    label: 'Level III',
    title: 'Clinical Hypnotherapy',
    intro:
      'The final module dives into the clinical applications of hypnotherapy, focusing on practical skills for real-world challenges.',
    topics: [
      ['Physical & Emotional Sexuality', 'Address relationship dynamics and intimacy challenges.'],
      ['Relationship Counseling', 'Help clients navigate emotional conflicts and restore balance.'],
      ['Family Systems Approach', 'Apply systemic therapy techniques to resolve generational trauma.'],
      ['Substance Abuse & Eating Disorders', 'Support clients struggling with addiction, anorexia, bulimia, and other disorders.'],
      ['Allergy Management', 'Explore how hypnosis aids in managing physical reactions.'],
      ['Habit Control (Smoking, Alcohol)', 'Help clients break free from destructive habits.'],
      ['Weight Control', 'Guide clients to achieve healthy, sustainable weight management.'],
      ['Sexual Dysfunction', 'Address emotional and physical barriers to intimacy.'],
      ['The Mental Bank', 'Teach clients how to reprogram their subconscious for success.'],
      ['Promoting Your Practice', 'Learn how to build, advertise, and grow your hypnotherapy practice.'],
    ],
    duration: '50 hours',
    cert: 'Clinical Hypnotherapist',
    prereq: 'Level II + Test cleared for Level II',
  },
];

const PER_LEVEL_TOPICS = [
  {
    label: 'Level 1',
    items: [
      'Understand personalities and language patterns',
      'Theory of mind',
      'Self-hypnosis',
      'Suggestibility and trance',
      'How to tap subconscious mind',
      'Reaching the root cause: various diagnostic tools',
      'How to reprogram SCM: Delete old files and replace with new files',
      'Many a times single sessions for one issue.',
    ],
  },
  {
    label: 'Level 2',
    items: [
      'Passive aggressive Behaviour',
      'Ericksonian Hypnosis and Milton model of communication',
      'Kapassian hypnosis and theory of mind',
      'Dream Therapy',
      'Hypno-diagnostic tools for each stage of development (if frequent regression to an age and do completion)',
      'How to deal with fears, phobias, anxiety, depression',
      'Age regression',
      'Corrective Therapy',
      'Paris window',
      'Ideomotor responses',
      'Body Syndromes: crying, responsibility, fight and flight, guilt',
      'Handwriting analysis',
    ],
  },
  {
    label: 'Level 3',
    items: [
      'Hypnodrama: building new neuropathways',
      'Genetic expressions',
      'How to help in physical health and healing',
      'NLP – language patterns',
      'How to use in sports',
      'Anchors and triggers: memory, fears, confidence, sports, exams',
      'Past life regression',
      'Desensitization',
      'Child hypnosis',
      'Surrogacy',
      'Medical Model of Hypnosis: for all pains and aches and diseases',
      'Habits and addictions',
      'Physical and emotional sexuality: understand why and how men and women relate with each other',
      'Relationship counselling',
      'First consultation in detail',
      'Theories of Psychology to understand behaviour, conflicts and stresses',
      'Clinical interviewing',
      'Family systems',
      'Children of dysfunctional relationships, healthy relationships',
      'Physical and sexual abuse',
      'Eating Disorder',
      'Substance disorder',
      'Crisis intervention',
      'How to deal explosive personalities',
      'Defence Mechanisms',
      'Memory enhancement',
      'Dream therapy',
      'Mental Banking for abundance',
      'Habit control',
    ],
  },
];

const BONUS_TOPICS = [
  'NLP: Neurolinguistic programming',
  'Void identification and clearance',
  'Cord Cutting',
  'Aura protection and Chakra healing session',
  'Ho’oponopono',
  'Womb healing',
  'Psychic Surgery',
  'Self-Talk Therapy',
];

function CurriculumContent({ showHeading = true, ctaTo = '/contact' }) {
  return (
    <div className="curriculum-content">
      {showHeading && (
        <div className="curriculum-intro">
          <h2 className="section-title">Course Modules</h2>
          <p className="curriculum-lead">
            A three-level structured certification path — from foundational hypnotherapy
            theory to advanced clinical applications — facilitated by{' '}
            <strong>Prof (Dr) Manju Agrawal</strong> (CHI-USA Certified Hypnotherapy Trainer,
            IMDHA Certified Practitioner).
          </p>
        </div>
      )}

      {LEVELS.map((lvl) => (
        <article key={lvl.id} id={lvl.id} className="curriculum-level">
          <header className="curriculum-level__header">
            <div>
              <span className="curriculum-level__label">{lvl.label}</span>
              <h3 className="curriculum-level__title">{lvl.title}</h3>
            </div>
            <div className="curriculum-level__meta">
              <div><strong>Duration:</strong> {lvl.duration}</div>
              <div><strong>Certification:</strong> {lvl.cert}</div>
              <div><strong>Prerequisite:</strong> {lvl.prereq}</div>
            </div>
          </header>
          <p className="curriculum-level__intro">{lvl.intro}</p>
          <h4 className="curriculum-level__sub">Key Topics Covered</h4>
          <ul className="curriculum-topics">
            {lvl.topics.map(([head, body]) => (
              <li key={head}>
                <strong>{head}</strong>
                {body && <> — {body}</>}
              </li>
            ))}
          </ul>
        </article>
      ))}

      <article className="curriculum-level">
        <header className="curriculum-level__header">
          <div>
            <span className="curriculum-level__label">Per-Level Topics</span>
            <h3 className="curriculum-level__title">Topics Covered Under Each Level</h3>
          </div>
        </header>
        <div className="curriculum-per-level">
          {PER_LEVEL_TOPICS.map((g) => (
            <div key={g.label} className="curriculum-per-level__col">
              <h4>{g.label}</h4>
              <ul>
                {g.items.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </article>

      <article className="curriculum-level curriculum-level--bonus">
        <header className="curriculum-level__header">
          <div>
            <span className="curriculum-level__label">Bonus</span>
            <h3 className="curriculum-level__title">Bonus Topics offered by MindSpa</h3>
          </div>
        </header>
        <ul className="curriculum-topics curriculum-topics--bonus">
          {BONUS_TOPICS.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </article>

      <div className="curriculum-cta">
        <p>Ready to start your hypnotherapy journey?</p>
        <Link to={ctaTo} className="btn-primary">Contact Us to Enroll</Link>
      </div>

      <style>{`
        .curriculum-content {
          color: var(--body-text, #555);
        }
        .curriculum-intro {
          max-width: 800px;
          margin: 0 auto 40px;
          text-align: center;
        }
        .curriculum-lead {
          font-size: 16px;
          line-height: 1.7;
          color: var(--body-text, #555);
          margin-top: 12px;
        }
        .curriculum-level {
          background: #fafafa;
          border-left: 4px solid var(--accent, #00d084);
          border-radius: 8px;
          padding: 24px 28px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .curriculum-level--bonus {
          border-left-color: #fcb900;
        }
        .curriculum-level__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .curriculum-level__label {
          display: inline-block;
          background: var(--accent, #00d084);
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .curriculum-level--bonus .curriculum-level__label {
          background: #fcb900;
        }
        .curriculum-level__title {
          font-family: 'Lora', serif;
          font-size: 22px;
          color: var(--text-dark, #222);
          margin: 4px 0 0;
        }
        .curriculum-level__meta {
          font-size: 14px;
          line-height: 1.8;
          color: var(--body-text, #444);
          background: #fff;
          padding: 10px 16px;
          border-radius: 6px;
          min-width: 220px;
        }
        .curriculum-level__meta strong {
          color: var(--text-dark, #222);
        }
        .curriculum-level__intro {
          font-size: 15px;
          line-height: 1.7;
          color: var(--body-text, #555);
          margin: 0 0 14px;
        }
        .curriculum-level__sub {
          font-size: 15px;
          font-weight: 600;
          color: var(--accent, #00d084);
          margin: 16px 0 8px;
        }
        .curriculum-topics {
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          line-height: 1.8;
          color: var(--body-text, #555);
        }
        .curriculum-topics li {
          margin-bottom: 6px;
        }
        .curriculum-topics strong {
          color: var(--text-dark, #222);
        }
        .curriculum-per-level {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .curriculum-per-level__col h4 {
          font-size: 15px;
          color: var(--accent, #00d084);
          margin: 0 0 10px;
        }
        .curriculum-per-level__col ul {
          padding-left: 18px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--body-text, #555);
        }
        .curriculum-cta {
          text-align: center;
          margin-top: 30px;
          padding: 32px 20px;
          background: linear-gradient(135deg, rgba(0,208,132,0.08), rgba(252,185,0,0.08));
          border-radius: 12px;
        }
        .curriculum-cta p {
          font-size: 17px;
          margin: 0 0 14px;
          color: var(--text-dark, #222);
        }
        @media (max-width: 800px) {
          .curriculum-per-level {
            grid-template-columns: 1fr;
          }
          .curriculum-level {
            padding: 20px 18px;
          }
          .curriculum-level__header {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default CurriculumContent;
