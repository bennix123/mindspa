import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';

function StarRating({ value, onChange, readonly = false, size = 20 }) {
  return (
    <div className="lms-stars" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`lms-star ${n <= value ? 'lms-star--filled' : ''} ${
            !readonly ? 'lms-star--clickable' : ''
          }`}
          onClick={() => !readonly && onChange && onChange(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Reviews({ courseId }) {
  const { getReviews, addReview, user, isEnrolled, getAverageRating } = useLMS();
  const reviews = getReviews(courseId);
  const avg = getAverageRating(courseId);
  const enrolled = isEnrolled(courseId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const userReview = user && reviews.find((r) => r.userId === user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }
    const result = addReview(courseId, rating, comment.trim());
    if (result.success) {
      setComment('');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="lms-reviews">
      <div className="lms-reviews__header">
        <h2>Student Reviews</h2>
        <div className="lms-reviews__rating">
          <span className="lms-reviews__avg">{avg}</span>
          <StarRating value={Math.round(avg)} readonly />
          <span className="lms-reviews__count">
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>

      {/* Add review form */}
      {user ? (
        enrolled ? (
          <form className="lms-reviews__form" onSubmit={handleSubmit}>
            <h4>{userReview ? 'Update Your Review' : 'Write a Review'}</h4>
            <div className="lms-reviews__form-rating">
              <span>Your Rating:</span>
              <StarRating value={rating} onChange={setRating} size={24} />
            </div>
            <textarea
              placeholder="Share your experience with this course..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            {error && <p className="lms-reviews__error">{error}</p>}
            <button type="submit">
              {userReview ? 'Update Review' : 'Post Review'}
            </button>
          </form>
        ) : (
          <p className="lms-reviews__notice">
            Enroll in this course to leave a review.
          </p>
        )
      ) : (
        <p className="lms-reviews__notice">
          <Link to="/login">Sign in</Link> to leave a review.
        </p>
      )}

      {/* Review list */}
      <div className="lms-reviews__list">
        {reviews.length === 0 ? (
          <p className="lms-reviews__empty">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="lms-review-item">
              <div className="lms-review-item__header">
                <div className="lms-review-item__avatar">
                  {r.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{r.userName}</strong>
                  <div className="lms-review-item__date">
                    {new Date(r.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <StarRating value={r.rating} readonly size={14} />
                </div>
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { StarRating };
export default Reviews;
