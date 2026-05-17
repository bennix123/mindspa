import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function Wishlist() {
  const { getWishlistCourses, toggleWishlist, addToCart, isInCart, enroll } =
    useLMS();
  const courses = getWishlistCourses();

  return (
    <>
      <PageBanner title="My Wishlist" />
      <section className="lms-catalog">
        <div className="container">
          <h2 className="section-title">Saved Courses</h2>

          {courses.length === 0 ? (
            <div className="lms-empty">
              <div className="lms-empty__icon">💝</div>
              <h3 className="lms-empty__title">Your wishlist is empty</h3>
              <p className="lms-empty__text">
                Save courses you're interested in for later.
              </p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="lms-grid">
              {courses.map((course) => (
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
                      <button
                        className="lms-card__btn"
                        style={{
                          background: 'transparent',
                          color: 'var(--text-light)',
                          border: '1px solid var(--border-light)',
                        }}
                        onClick={() => toggleWishlist(course.id)}
                      >
                        Remove
                      </button>
                      {course.price === 0 ? (
                        <button
                          className="lms-card__btn lms-card__btn--enroll"
                          onClick={() => enroll(course.id)}
                        >
                          Enroll
                        </button>
                      ) : isInCart(course.id) ? (
                        <Link to="/cart" className="lms-card__btn lms-card__btn--view">
                          In Cart
                        </Link>
                      ) : (
                        <button
                          className="lms-card__btn lms-card__btn--enroll"
                          onClick={() => addToCart(course.id)}
                        >
                          Add to Cart
                        </button>
                      )}
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

export default Wishlist;
