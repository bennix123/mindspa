import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function Profile() {
  const {
    user,
    logout,
    getEnrolledCourses,
    getAllCertificates,
    getAllNotes,
    bookmarks,
    streak,
  } = useLMS();

  if (!user) return <Navigate to="/login" replace />;

  const enrolled = getEnrolledCourses();
  const certs = getAllCertificates();
  const notes = getAllNotes();

  return (
    <>
      <PageBanner title="My Profile" />
      <section className="lms-dashboard">
        <div className="container">
          <div className="lms-profile-card">
            <div className="lms-profile-card__avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="lms-profile-card__info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <small>
                Member since{' '}
                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric',
                })}
              </small>
            </div>
            <button
              className="lms-card__btn"
              style={{
                background: 'transparent',
                color: '#d32f2f',
                border: '1px solid #d32f2f',
              }}
              onClick={logout}
            >
              Sign Out
            </button>
          </div>

          <div className="lms-dashboard__stats">
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">{enrolled.length}</div>
              <div className="lms-stat-card__label">Enrolled</div>
            </div>
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">{certs.length}</div>
              <div className="lms-stat-card__label">Certificates</div>
            </div>
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">🔥 {streak.current}</div>
              <div className="lms-stat-card__label">Day Streak</div>
            </div>
            <div className="lms-stat-card">
              <div className="lms-stat-card__value">{bookmarks.length}</div>
              <div className="lms-stat-card__label">Bookmarks</div>
            </div>
          </div>

          {certs.length > 0 && (
            <div className="lms-dashboard__courses">
              <h2>My Certificates</h2>
              {certs.map((c) => (
                <div key={c.certificateId} className="lms-enrolled-card">
                  <img src={c.course.image} alt={c.course.title} className="lms-enrolled-card__img" />
                  <div className="lms-enrolled-card__body">
                    <h3 className="lms-enrolled-card__title">{c.course.title}</h3>
                    <p className="lms-enrolled-card__instructor">
                      Completed{' '}
                      {new Date(c.completedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      · ID: {c.certificateId}
                    </p>
                    <div className="lms-enrolled-card__actions">
                      <Link
                        to={`/certificate/${c.course.id}`}
                        className="lms-card__btn lms-card__btn--view"
                      >
                        View Certificate 🏆
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {notes.length > 0 && (
            <div className="lms-dashboard__courses">
              <h2>My Notes ({notes.length})</h2>
              {notes.slice(0, 5).map((n, i) => (
                <div key={i} className="lms-profile-note">
                  <Link to={`/courses/${n.courseId}/learn/${n.lessonId}`}>
                    Lesson note →
                  </Link>
                  <p>{n.content.substring(0, 200)}{n.content.length > 200 ? '...' : ''}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Profile;
