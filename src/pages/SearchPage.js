import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const { searchCourses } = useLMS();
  const results = searchCourses(query);

  return (
    <>
      <PageBanner title="Search Results" />
      <section className="lms-catalog">
        <div className="container">
          <h2 className="section-title">
            {query ? `Results for "${query}"` : 'Search Courses'}
          </h2>
          <p className="section-subtitle">
            {results.length} {results.length === 1 ? 'course' : 'courses'} found
          </p>

          {results.length === 0 ? (
            <div className="lms-empty">
              <div className="lms-empty__icon">🔍</div>
              <h3 className="lms-empty__title">No courses found</h3>
              <p className="lms-empty__text">
                Try a different search term or browse all courses.
              </p>
              <Link to="/courses" className="btn-primary">
                Browse All Courses
              </Link>
            </div>
          ) : (
            <div className="lms-grid">
              {results.map((course) => (
                <div key={course.id} className="lms-card">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="lms-card__img"
                  />
                  <div className="lms-card__body">
                    <div className="lms-card__meta">
                      <span
                        className={`lms-card__badge ${
                          course.price === 0
                            ? 'lms-card__badge--free'
                            : 'lms-card__badge--paid'
                        }`}
                      >
                        {course.price === 0 ? 'Free' : `₹${course.price}`}
                      </span>
                      <span className="lms-card__badge lms-card__badge--level">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="lms-card__title">{course.title}</h3>
                    <p className="lms-card__desc">{course.description}</p>
                    <div className="lms-card__footer">
                      <span className="lms-card__price">
                        {course.price === 0 ? 'Free' : `₹${course.price}`}
                      </span>
                      <Link
                        to={`/courses/${course.id}`}
                        className="lms-card__btn lms-card__btn--view"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchPage;
