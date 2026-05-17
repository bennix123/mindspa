import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import Reviews from '../components/LMS/Reviews';
import Quiz from '../components/LMS/Quiz';
import '../styles/LMS.css';

function CourseDetail() {
  const { courseId } = useParams();
  const {
    getCourse,
    fetchCourseDetail,
    fetchReviews,
    getInstructor,
    getQuiz,
    isEnrolled,
    enroll,
    unenroll,
    addToCart,
    isInCart,
    isInWishlist,
    toggleWishlist,
    isLessonCompleted,
    getCourseProgress,
    getAllLessonsFlat,
    getCertificate,
    getAverageRating,
    loading,
  } = useLMS();

  const [openModules, setOpenModules] = useState([0]);
  const [tab, setTab] = useState('overview');
  const [detailLoaded, setDetailLoaded] = useState(false);

  useEffect(() => {
    fetchCourseDetail(courseId).then(() => setDetailLoaded(true));
    fetchReviews(courseId);
  }, [courseId, fetchCourseDetail, fetchReviews]);

  const course = getCourse(courseId);

  if (loading || !detailLoaded) {
    return (
      <section className="lms-detail">
        <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)' }}>Loading course...</p>
        </div>
      </section>
    );
  }

  if (!course) return <Navigate to="/courses" replace />;

  const instructor = getInstructor(course.instructorId);
  const enrolled = isEnrolled(courseId);
  const wished = isInWishlist(courseId);
  const inCart = isInCart(courseId);
  const progress = getCourseProgress(courseId);
  const allLessons = getAllLessonsFlat(courseId);
  const cert = getCertificate(courseId);
  const avgRating = getAverageRating(courseId);
  const firstIncomplete = allLessons.find((l) => !isLessonCompleted(courseId, l.id));

  const toggleModule = (idx) => {
    setOpenModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <>
      <PageBanner title={course.title} />

      <section className="lms-detail">
        <div className="container">
          <div className="lms-detail__hero">
            <img src={course.image} alt={course.title} className="lms-detail__img" />
            <div className="lms-detail__info">
              <h1>{course.title}</h1>
              <p>{course.description}</p>

              <div className="lms-detail__meta-row">
                <span className="lms-detail__meta-item">
                  👤 <strong>{course.instructor}</strong>
                </span>
                <span className="lms-detail__meta-item">⏱ {course.duration}</span>
                <span className="lms-detail__meta-item">📚 {course.lessons} lessons</span>
                <span className="lms-detail__meta-item">📊 {course.level}</span>
                <span className="lms-detail__meta-item">⭐ {avgRating}</span>
                <span className="lms-detail__meta-item">👥 {course.enrolled} enrolled</span>
              </div>

              {enrolled && (
                <div className="lms-detail__progress">
                  <span className="lms-detail__progress-text">{progress}% complete</span>
                  <div className="lms-progress">
                    <div className="lms-progress__fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {enrolled ? (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link
                    to={`/courses/${courseId}/learn/${
                      firstIncomplete ? firstIncomplete.id : allLessons[0]?.id
                    }`}
                    className="lms-detail__enroll-btn lms-detail__enroll-btn--learn"
                  >
                    {progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Link>
                  {cert && (
                    <Link
                      to={`/certificate/${courseId}`}
                      className="lms-detail__enroll-btn lms-detail__enroll-btn--enroll"
                    >
                      View Certificate 🏆
                    </Link>
                  )}
                  <button
                    className="lms-detail__enroll-btn lms-detail__enroll-btn--unenroll"
                    onClick={() => unenroll(courseId)}
                  >
                    Unenroll
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {course.price === 0 ? (
                    <button
                      className="lms-detail__enroll-btn lms-detail__enroll-btn--enroll"
                      onClick={() => enroll(courseId)}
                    >
                      Enroll
                    </button>
                  ) : (
                    <Link
                      to="/contact"
                      className="lms-detail__enroll-btn lms-detail__enroll-btn--enroll"
                    >
                      Contact Us
                    </Link>
                  )}
                  <button
                    className="lms-detail__enroll-btn lms-detail__enroll-btn--unenroll"
                    onClick={() => toggleWishlist(courseId)}
                    style={{ color: wished ? '#d32f2f' : 'var(--text-light)' }}
                  >
                    {wished ? '♥ Wishlisted' : '♡ Wishlist'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="lms-tabs">
            <button
              className={`lms-tab ${tab === 'overview' ? 'active' : ''}`}
              onClick={() => setTab('overview')}
            >
              Overview
            </button>
            <button
              className={`lms-tab ${tab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`lms-tab ${tab === 'instructor' ? 'active' : ''}`}
              onClick={() => setTab('instructor')}
            >
              Instructor
            </button>
            <button
              className={`lms-tab ${tab === 'reviews' ? 'active' : ''}`}
              onClick={() => setTab('reviews')}
            >
              Reviews
            </button>
          </div>

          {tab === 'overview' && (
            <div className="lms-detail__learn">
              <h3>What You'll Learn</h3>
              <ul>
                {course.whatYouLearn.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'curriculum' && (
            <div className="lms-curriculum">
              <h2>Course Curriculum</h2>
              {course.modules.map((mod, mi) => {
                const quiz = getQuiz(courseId, mi);
                return (
                  <div key={mi} className="lms-module">
                    <div className="lms-module__header" onClick={() => toggleModule(mi)}>
                      <span className="lms-module__title">
                        {openModules.includes(mi) ? '▾' : '▸'} Module {mi + 1}: {mod.title}
                      </span>
                      <span className="lms-module__count">
                        {mod.lessons.length} lessons{quiz ? ' + Quiz' : ''}
                      </span>
                    </div>

                    {openModules.includes(mi) && (
                      <div className="lms-module__lessons">
                        {mod.lessons.map((lesson) => {
                          const done = isLessonCompleted(courseId, lesson.id);
                          return enrolled ? (
                            <Link
                              key={lesson.id}
                              to={`/courses/${courseId}/learn/${lesson.id}`}
                              className="lms-lesson-row"
                            >
                              <span className={`lms-lesson-row__check ${done ? 'done' : ''}`}>
                                {done ? '✓' : ''}
                              </span>
                              <span className="lms-lesson-row__icon">
                                {lesson.type === 'video' ? '▶' : '📄'}
                              </span>
                              <span className="lms-lesson-row__title">{lesson.title}</span>
                              <span className="lms-lesson-row__duration">{lesson.duration}</span>
                            </Link>
                          ) : (
                            <div key={lesson.id} className="lms-lesson-row">
                              <span className="lms-lesson-row__check" />
                              <span className="lms-lesson-row__icon">
                                {lesson.type === 'video' ? '▶' : '📄'}
                              </span>
                              <span className="lms-lesson-row__title">{lesson.title}</span>
                              <span className="lms-lesson-row__duration">{lesson.duration}</span>
                              <span className="lms-lesson-row__lock">🔒</span>
                            </div>
                          );
                        })}
                        {quiz && enrolled && (
                          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-light)' }}>
                            <Quiz courseId={courseId} moduleIdx={mi} quiz={quiz} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'instructor' && instructor && (
            <div className="lms-instructor">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="lms-instructor__avatar"
              />
              <div className="lms-instructor__info">
                <h2>{instructor.name}</h2>
                <p className="lms-instructor__title">{instructor.title}</p>
                <div className="lms-instructor__stats">
                  <span>⭐ {instructor.rating} Rating</span>
                  <span>👥 {instructor.students} Students</span>
                  <span>📚 {instructor.courses} Courses</span>
                </div>
                <p className="lms-instructor__bio">{instructor.bio}</p>
                <div className="lms-instructor__expertise">
                  {instructor.expertise.map((e) => (
                    <span key={e} className="lms-instructor__tag">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'reviews' && <Reviews courseId={courseId} />}
        </div>
      </section>
    </>
  );
}

export default CourseDetail;
