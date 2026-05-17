import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function Dashboard() {
  const {
    user,
    getEnrolledCourses,
    getCourseProgress,
    getAllLessonsFlat,
    isLessonCompleted,
    getAllCertificates,
    streak,
    bookmarks,
    getCourse,
  } = useLMS();

  const enrolled = getEnrolledCourses();
  const certs = getAllCertificates();

  const totalLessonsDone = enrolled.reduce((sum, c) => {
    const lessons = getAllLessonsFlat(c.id);
    return sum + lessons.filter((l) => isLessonCompleted(c.id, l.id)).length;
  }, 0);

  return (
    <>
      <PageBanner title={user ? `Welcome, ${user.name}` : 'My Dashboard'} />

      <section className="lms-dashboard">
        <div className="container">
          {!user && (
            <div className="lms-auth-banner">
              <p>
                <strong>Sign in</strong> to save your progress, earn certificates, and access your courses across devices.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link to="/login" className="btn-primary">Sign In</Link>
                <Link to="/register" className="btn-outline">Register</Link>
              </div>
            </div>
          )}

          <div className="lms-dashboard__stats">
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">{enrolled.length}</div>
              <div className="lms-stat-card__label">Enrolled Courses</div>
            </div>
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">{totalLessonsDone}</div>
              <div className="lms-stat-card__label">Lessons Completed</div>
            </div>
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">{certs.length}</div>
              <div className="lms-stat-card__label">Certificates Earned</div>
            </div>
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">🔥 {streak.current}</div>
              <div className="lms-stat-card__label">Day Streak</div>
            </div>
          </div>

          {/* Enrolled courses */}
          <div className="lms-dashboard__courses">
            <h2>My Courses</h2>

            {enrolled.length === 0 ? (
              <div className="lms-empty">
                <div className="lms-empty__icon">📚</div>
                <h3 className="lms-empty__title">No courses yet</h3>
                <p className="lms-empty__text">
                  Browse our catalog and enroll in a course to get started.
                </p>
                <Link to="/courses" className="btn-primary">Explore Courses</Link>
              </div>
            ) : (
              enrolled.map((course) => {
                const progress = getCourseProgress(course.id);
                const allLessons = getAllLessonsFlat(course.id);
                const firstIncomplete = allLessons.find(
                  (l) => !isLessonCompleted(course.id, l.id)
                );

                return (
                  <div key={course.id} className="lms-enrolled-card">
                    <img src={course.image} alt={course.title} className="lms-enrolled-card__img" />
                    <div className="lms-enrolled-card__body">
                      <h3 className="lms-enrolled-card__title">{course.title}</h3>
                      <p className="lms-enrolled-card__instructor">
                        {course.instructor} &middot; {course.duration} &middot; {course.lessons} lessons
                      </p>

                      <div className="lms-progress">
                        <div className="lms-progress__fill" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="lms-progress-text">{progress}% complete</span>

                      <div className="lms-enrolled-card__actions">
                        <Link
                          to={
                            firstIncomplete
                              ? `/courses/${course.id}/learn/${firstIncomplete.id}`
                              : `/courses/${course.id}`
                          }
                          className="lms-card__btn lms-card__btn--view"
                        >
                          {progress === 100 ? 'Review' : progress > 0 ? 'Continue' : 'Start'}
                        </Link>
                        <Link
                          to={`/courses/${course.id}`}
                          className="lms-card__btn"
                          style={{
                            background: 'transparent',
                            color: 'var(--text-body)',
                            border: '1px solid var(--border-light)',
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Certificates */}
          {certs.length > 0 && (
            <div className="lms-dashboard__courses">
              <h2>🏆 Certificates Earned</h2>
              <div className="lms-cert-grid">
                {certs.map((c) => (
                  <Link
                    key={c.certificateId}
                    to={`/certificate/${c.course.id}`}
                    className="lms-cert-card"
                  >
                    <div className="lms-cert-card__icon">🏆</div>
                    <h4>{c.course.title}</h4>
                    <p>
                      Completed{' '}
                      {new Date(c.completedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <small>{c.certificateId}</small>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <div className="lms-dashboard__courses">
              <h2>🔖 Bookmarked Lessons</h2>
              <div className="lms-bookmark-list">
                {bookmarks.slice(0, 5).map((b) => {
                  const c = getCourse(b.courseId);
                  if (!c) return null;
                  const lesson = getAllLessonsFlat(b.courseId).find((l) => l.id === b.lessonId);
                  if (!lesson) return null;
                  return (
                    <Link
                      key={`${b.courseId}-${b.lessonId}`}
                      to={`/courses/${b.courseId}/learn/${b.lessonId}`}
                      className="lms-bookmark-item"
                    >
                      <div>
                        <strong>{lesson.title}</strong>
                        <small>{c.title}</small>
                      </div>
                      <span>→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
