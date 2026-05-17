import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Team.css';

const teamMembers = [
  {
    initials: 'AA',
    gradient: 'linear-gradient(135deg, #00d084 0%, #00a86b 100%)',
    name: 'Ms. Arya Aravind',
    title: 'Clinical Psychologist & Counsellor',
    affiliation: 'IIT Palakkad',
    image: '',
    tags: ['Ph.D. Psychology', 'RCI Reg. A54264', 'ACT Specialist'],
    summary:
      'Clinical psychologist at IIT Palakkad focusing on young adults, Acceptance & Commitment Therapy, and integrating Indian philosophical perspectives with evidence-based therapy.',
    sections: [
      {
        heading: 'Education & Credentials',
        body:
          'Ph.D. in Psychology from Amity University, Lucknow · M.Phil. in Clinical Psychology from Amity University, Jaipur · Licensed practitioner registered under the Rehabilitation Council of India (RCI Registration No: A54264).',
      },
      {
        heading: 'Research Interests',
        body:
          'Young adults and their psychological wellbeing, with particular emphasis on Acceptance and Commitment Therapy (ACT), Indian philosophical and psychological perspectives, and behavioural addictions. Especially interested in integrating culturally grounded Indian knowledge systems with contemporary evidence-based therapeutic approaches.',
      },
      {
        heading: 'Clinical Experience',
        body:
          'Prior to her role at IIT Palakkad, she gained clinical and community experience at EMS Memorial Hospital and the Mental Health Action Trust (MHAT).',
      },
      {
        heading: 'Therapeutic Approach',
        body:
          'Integrative — drawing from evidence-based modalities such as Acceptance and Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT), Solution-Focused Brief Therapy (SFBT), and mindfulness-based practices. Co-developer of Meditative Self-Talk, a therapeutic approach rooted in indigenous Indian practices.',
      },
      {
        heading: 'Publications & Affiliations',
        body:
          'Contributed to academic literature through publications and book chapters in the field of mental health and well-being. Lifetime member of the Clinical Psychology Society of India (CPSI). Committed to advancing culturally sensitive and contextually relevant psychological interventions.',
      },
    ],
  },
  {
    initials: 'SA',
    gradient: 'linear-gradient(135deg, #fcb900 0%, #e0a600 100%)',
    name: 'Ms. Saima Ayyub',
    title: 'Assistant Professor of Clinical Psychology',
    affiliation: 'AIBAS, Amity University Lucknow',
    image: '/client-pic/team-saima-ayyub.jpeg',
    tags: ['RCI Reg. A65372', '10+ yrs Experience', 'CBT & DBT'],
    summary:
      'Clinical psychologist with over 10 years of experience in practice, teaching, training, and research. Currently Assistant Professor at Amity University Lucknow.',
    sections: [
      {
        heading: 'Academic Role',
        body:
          'Actively involved in teaching and training M.Phil. Clinical Psychology and Professional Diploma in Clinical Psychology students. Responsibilities include instruction in psychological assessment, evidence-based psychotherapies, and supervision of clinical research and dissertations.',
      },
      {
        heading: 'Clinical Experience',
        body:
          'Extensive clinical experience gained through her association with reputed institutions such as King George\'s Medical University (KGMU), Lucknow, and IRA Life Care, Greater Noida.',
      },
      {
        heading: 'Publications & Scholarship',
        body:
          'Scopus indexed international and national publications, book chapters in peer-reviewed journals, and one copyright — reflecting sustained engagement in scholarly work.',
      },
      {
        heading: 'Guest Speaker & Resource Person',
        body:
          'Served at various mental health and medical institutions including Nur Manzil Psychiatric Centre, King George Medical College, and T.S. Mishra Medical College, Lucknow — contributing to professional training and academic enrichment.',
      },
      {
        heading: 'Areas of Expertise',
        body:
          'Cognitive Behaviour Therapy (CBT) · Dialectical Behaviour Therapy (DBT) · Meditative Self-Talk (MST) · Schema-Focused Therapy · Mentalization-Based Therapy · Trauma-Focused Psychotherapy · Geriatric Mental Health · Evidence-Based Psychotherapeutic Interventions.',
      },
    ],
  },
  {
    initials: 'DC',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    name: 'Ms. Dharini Chandola',
    title: 'Counselling Psychologist & Hypnotherapist',
    affiliation: 'MindSpa India',
    image: '/client-pic/team-dharini-chandola.png',
    tags: ['M.A. Counselling', 'Hypnotherapy Level V', 'Inner Child Healing'],
    summary:
      'Counselling Psychologist with a unique blend of scientific rigor and psychological insight. Specializes in hypnotherapy, inner child healing, and past life regression.',
    sections: [
      {
        heading: 'Education',
        body:
          'Master\'s degree in Counselling Psychology from Amity University, Lucknow · B.Tech. in Biotechnology from JIIT, Noida. Her academic journey reflects a unique blend of scientific rigor and psychological insight that informs her structured yet empathetic therapeutic approach.',
      },
      {
        heading: 'Training & Specialization',
        body:
          'Driven by a deep interest in understanding how thoughts, emotions, and beliefs shape human behavior and life experiences. She has successfully completed Level V in Hypnotherapy and is proficient in a wide range of therapeutic techniques.',
      },
      {
        heading: 'Therapeutic Focus',
        body:
          'Supporting individuals through challenges in personal life, relationships, and career, while also addressing concerns such as stress, anxiety, depression, pain management, and psychosomatic health conditions. Committed to helping clients achieve clarity, emotional balance, and sustainable personal growth.',
      },
      {
        heading: 'Areas of Expertise',
        body:
          'Resolution of present-life challenges through integrated clinical hypnotherapy · Past Life Regression · Inner Child Healing · Age Regression Therapy (ART) · Relationship Counselling · Fear Management through Circle Therapy · Pain Management through Submarine Technique · Emotional Freedom Technique (EFT) · Passive Aggressive Behaviour (PAB) resolution.',
      },
    ],
  },
  {
    initials: 'MA',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    name: 'Dr. Manju Agrawal',
    title: 'Professor Emeritus & Founder Director',
    affiliation: 'Amity University · Mind Spa Foundation',
    image: '/client-pic/gallery-3.jpeg',
    tags: ['40+ yrs Experience', 'CHI Certified Trainer', 'Ph.D. Psychology'],
    summary:
      'Professor Emeritus at Amity University with 40+ years of experience. Internationally certified hypnotherapy trainer, author, and founder of MindSpa Foundation.',
    sections: [
      {
        heading: 'Academic & Professional Roles',
        body:
          'Currently Professor Emeritus at Amity University with more than 40 years of experience as Professor of Psychology and social entrepreneur. Former Dean of Student Welfare. Founder Director of the Behavioural Science Institute, the Centre of Excellence for Happiness at Amity University, and the Mind Spa Foundation.',
      },
      {
        heading: 'Expertise & Certifications',
        body:
          'Ph.D. in Psychology · Subconscious mind coach · Internationally certified (IMDHA) hypnotherapy practitioner · CHI certified hypnotherapy trainer · Past-life regression therapist · Family constellation therapist · Training in energy medicine, NLP, EFT, CBT, mindfulness, chakra diagnosis & healing, and various psychotherapies.',
      },
      {
        heading: 'Publications & Recognition',
        body:
          'International speaker and trainer · Author of 3 books and two psychometric scales · Many papers in Scopus-indexed journals of USA, UK, and India. Her latest book "Psychology of Self-talk" is transformative. Next book on Meditative Self-talk Therapy is under publication.',
      },
      {
        heading: 'Fellowships & Awards',
        body:
          'Recipient of UGC, ICSSR, ICMR, Royal Netherlands, Bill Gates, and EXXON Mobil (USA) fellowships · Part of Indian and international delegations to the United Nations · ICPD Advancement Award (USAID, USA) · Four outstanding national and international woman achiever awards · Former executive member of the Planning Commission on WCD for the 11th Plan.',
      },
      {
        heading: 'Social Impact & Coaching',
        body:
          'Intensively worked for marginalised women in 20 districts of UP. As an executive coach, she has helped many corporate employees succeed 10X and fulfil their dreams. She has a record of bringing out people from emotional dysregulation, panic attacks, untreatable diseases, allergies, anxieties, fears, depression, fainting, relationship breakups, and addictions in just a few sessions — a no-medicine approach with only positive side-effects and outcomes.',
      },
    ],
  },
];

const Team = () => {
  const [sectionRef, sectionVis] = useScrollReveal();
  const [selected, setSelected] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected !== null) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [selected]);

  const member = selected !== null ? teamMembers[selected] : null;

  return (
    <>
    <section className="team" id="team">
      <div className="container">
        <div ref={sectionRef} className={`team__header ${sectionVis ? 'visible' : ''}`}>
          <p className="section-label">Meet The Experts</p>
          <h2 className="team__title">Meet Our Team of Experts</h2>
          <p className="team__desc">
            A team of certified psychologists, therapists, and trainers — bringing decades
            of combined experience in clinical psychology, hypnotherapy, and holistic wellness.
          </p>
        </div>

        <div className="team__grid">
          {teamMembers.map((m, i) => (
            <article key={i} className="team-card" onClick={() => setSelected(i)}>
              <div className="team-card__avatar" style={{ background: m.gradient }}>
                {m.image ? (
                  <img src={m.image} alt={m.name} />
                ) : (
                  <span className="team-card__initials">{m.initials}</span>
                )}
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{m.name}</h3>
                <p className="team-card__title">{m.title}</p>
                <p className="team-card__affiliation">{m.affiliation}</p>
                <div className="team-card__tags">
                  {m.tags.map((t) => (
                    <span key={t} className="team-card__tag">{t}</span>
                  ))}
                </div>
                <p className="team-card__summary">{m.summary}</p>
                <button type="button" className="team-card__link">
                  View Full Profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>

    {/* Bio Modal — portaled to document.body so no parent CSS can trap it */}
    {member && ReactDOM.createPortal(
      <div className="team-modal" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
        <div className="team-modal__card">
          <button
            className="team-modal__close"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="team-modal__header">
            <div className="team-modal__avatar" style={{ background: member.gradient }}>
              {member.image ? (
                <img src={member.image} alt={member.name} />
              ) : (
                <span>{member.initials}</span>
              )}
            </div>
            <div>
              <h3>{member.name}</h3>
              <p className="team-modal__role">{member.title}</p>
              <p className="team-modal__aff">{member.affiliation}</p>
              <div className="team-card__tags">
                {member.tags.map((t) => (
                  <span key={t} className="team-card__tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="team-modal__body">
            {member.sections.map((s, i) => (
              <div key={i} className="team-modal__section">
                <h4>{s.heading}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="team-modal__footer">
            <a href="/contact" className="btn-primary">Book a Session</a>
            <button className="btn-outline" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
};

export default Team;
