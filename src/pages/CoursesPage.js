import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

const LEVELS = ['All', 'Beginner', 'Intermediate'];

const UPCOMING_COURSES = [
  {
    id: 'diploma-clinical-hypnotherapy-level-1',
    title: 'Diploma in Clinical Hypnotherapy',
    subtitle: 'Level 1: Introduction to Clinical Hypnotherapy',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600',
    dates: '21st, 22nd & 23rd June 2026',
    timing: '9:30 a.m. – 5:00 p.m. IST',
    mode: 'In-person Training',
    certification: 'Master Hypnotist',
    duration: '20 hours',
    instructor: 'Prof (Dr) Manju Agrawal',
    instructorBio: 'Internationally Certified (IMDHA) Hypnotherapy Practitioner • CHI-(USA) Certified Hypnotherapy Trainer',
    blurb: 'Learn hypnotherapy from our expert facilitator and get certified by CHI-(USA).',
    topics: [
      'Self Hypnosis',
      'Brief History of Hypnosis',
      'History and Development of the Human Mind',
      'The Theory of Mind',
      'How to create the Hypnotic State',
      'The Theory of Suggestibility',
      'The Laws of Suggestibility',
      'How to conduct a Hypnosis Session',
      'Deepening Techniques',
      'Wording of Effective Suggestions',
      'Post Hypnotic suggestion for Re-Hypnosis',
    ],
  },
  {
    id: 'diploma-clinical-hypnotherapy-level-2',
    title: 'Diploma in Clinical Hypnotherapy',
    subtitle: 'Level II: Advanced Hypnotic Techniques and Modalities',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600',
    dates: '24th, 25th, 27th, 28th & 29th June 2026',
    timing: '9:30 a.m. – 6:00 p.m. IST',
    mode: 'In-person Training',
    certification: 'Master Hypnotherapist',
    duration: '40 hours',
    instructor: 'Prof (Dr) Manju Agrawal',
    instructorBio: 'Internationally Certified (IMDHA) Hypnotherapy Practitioner • CHI-(USA) Certified Hypnotherapy Trainer',
    blurb: 'Learn hypnotherapy from our expert facilitator and get certified by CHI-(USA).',
    topics: [
      'Hypnotic Modalities',
      'Basics of Ericksonian and Kappasinian Hypnosis',
      'Hypno-Diagnostic Tools',
      'Hypnodrama',
      'Introduction to Neuro-Linguistic Programming (NLP)',
      'Introduction to Handwriting Analysis',
      'Hypnotic Regression (Age Regression & Past Life Regression)',
      'Dream Therapy and Interpretation',
      'Fear & Phobia Management',
      'Emotional Empowerment Technique',
      'Medical Model of Hypnosis',
      'Child Hypnosis',
      'Body Syndromes',
    ],
  },
];

function CoursesPage() {
  const {
    courses,
    categories,
    isEnrolled,
    enroll,
    isInWishlist,
    toggleWishlist,
    getAverageRating,
  } = useLMS();

  const location = useLocation();
  const [tab, setTab] = useState('all'); // 'all' | 'upcoming'
  const [level, setLevel] = useState('All');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  // Sync tab to ?mode=online (All Courses) | ?mode=offline (Upcoming/in-person)
  useEffect(() => {
    const mode = new URLSearchParams(location.search).get('mode');
    if (mode === 'offline') setTab('upcoming');
    else if (mode === 'online') setTab('all');
  }, [location.search]);

  let filtered = courses;
  if (category !== 'all') filtered = filtered.filter((c) => c.category === category);
  if (level !== 'All') filtered = filtered.filter((c) => c.level === level);
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
    );
  }

  return (
    <>
      <PageBanner title="All Courses" />

      <section className="lms-catalog">
        <div className="container">
          <h2 className="section-title">Explore Our Courses</h2>
          <p className="section-subtitle">
            Professional courses in psychology, wellness & personal growth
          </p>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>

          {/* Tabs */}
          <div className="lms-tabs-row">
            <button
              className={`lms-tab-btn ${tab === 'all' ? 'active' : ''}`}
              onClick={() => setTab('all')}
            >
              All Courses
            </button>
            <button
              className={`lms-tab-btn ${tab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setTab('upcoming')}
            >
              Upcoming Courses
            </button>
          </div>

          {tab === 'upcoming' ? (
            <>
            <h3 className="lms-upcoming-heading">Our Upcoming Specialized Courses</h3>
            <div className="lms-grid">
              {UPCOMING_COURSES.map((c) => (
                <div key={c.id} className="lms-card lms-card--upcoming">
                  <div className="lms-card__img-wrap">
                    <img src={c.image} alt={c.title} className="lms-card__img" />
                    <span className="lms-card__upcoming-flag">Upcoming</span>
                  </div>
                  <div className="lms-card__body">
                    <h3 className="lms-card__title">{c.title}</h3>
                    <p className="lms-card__subtitle"><strong>{c.subtitle}</strong></p>
                    <p className="lms-card__instructor">by {c.instructor}</p>
                    <p className="lms-card__instructor-bio">{c.instructorBio}</p>

                    <div className="lms-upcoming-meta">
                      <div><strong>Dates:</strong> {c.dates}</div>
                      <div><strong>Timing:</strong> {c.timing}</div>
                      <div><strong>Mode:</strong> {c.mode}</div>
                      <div><strong>Certification:</strong> {c.certification}</div>
                      <div><strong>Duration:</strong> {c.duration}</div>
                    </div>

                    <p className="lms-card__desc" style={{ marginTop: 12 }}>{c.blurb}</p>

                    <details className="lms-upcoming-topics">
                      <summary>Key topics covered</summary>
                      <ul>
                        {c.topics.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </details>

                    <div className="lms-card__footer lms-card__footer--upcoming">
                      <Link
                        to="/courses/clinical-hypnotherapy-curriculum"
                        className="lms-card__btn lms-card__btn--explore"
                      >
                        Explore Full Curriculum →
                      </Link>
                      <Link
                        to="/contact"
                        className="lms-card__btn lms-card__btn--enroll"
                      >
                        Contact Us to Enroll
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </>
          ) : (
          <>
          {/* Search bar */}
          <div className="lms-search-bar">
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="lms-search-bar__icon">🔍</span>
          </div>

          {/* Categories */}
          <div className="lms-categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`lms-category-btn ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Level filters */}
          <div className="lms-filters">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                className={`lms-filter-btn ${level === lvl ? 'active' : ''}`}
                onClick={() => setLevel(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="lms-empty">
              <div className="lms-empty__icon">😔</div>
              <h3 className="lms-empty__title">No courses match your filters</h3>
              <p className="lms-empty__text">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="lms-grid">
              {filtered.map((course) => {
                const enrolled = isEnrolled(course.id);
                const wished = isInWishlist(course.id);
                const avgRating = getAverageRating(course.id);

                return (
                  <div key={course.id} className="lms-card">
                    <div className="lms-card__img-wrap">
                      <img src={course.image} alt={course.title} className="lms-card__img" />
                      <button
                        className={`lms-card__wishlist ${wished ? 'active' : ''}`}
                        onClick={() => toggleWishlist(course.id)}
                        aria-label="Wishlist"
                      >
                        {wished ? '♥' : '♡'}
                      </button>
                    </div>
                    <div className="lms-card__body">
                      <div className="lms-card__meta">
                        <span className="lms-card__badge lms-card__badge--level">
                          {course.level}
                        </span>
                      </div>

                      <Link to={`/courses/${course.id}`}>
                        <h3 className="lms-card__title">{course.title}</h3>
                      </Link>
                      <p className="lms-card__instructor">by {course.instructor}</p>
                      <p className="lms-card__desc">{course.description}</p>

                      <div className="lms-card__stats">
                        <span>⏱ {course.duration}</span>
                        <span>📚 {course.lessons} lessons</span>
                        <span>⭐ {avgRating}</span>
                      </div>

                      <div className="lms-card__footer">
                        {enrolled ? (
                          <Link to={`/courses/${course.id}`} className="lms-card__btn lms-card__btn--view">
                            Continue
                          </Link>
                        ) : course.price === 0 ? (
                          <button
                            className="lms-card__btn lms-card__btn--enroll"
                            onClick={() => enroll(course.id)}
                          >
                            Enroll
                          </button>
                        ) : (
                          <Link
                            to="/contact"
                            className="lms-card__btn lms-card__btn--enroll"
                          >
                            Contact Us
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </>
          )}
        </div>
      </section>
    </>
  );
}

export default CoursesPage;
