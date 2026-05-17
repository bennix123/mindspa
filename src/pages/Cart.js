import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import RazorpayDemo from '../components/RazorpayDemo';
import '../styles/LMS.css';

function Cart() {
  const { getCartCourses, removeFromCart, getCartTotal, checkout, user } =
    useLMS();
  const navigate = useNavigate();
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [success, setSuccess] = useState(false);

  const courses = getCartCourses();
  const total = getCartTotal();
  const grandTotal = total + Math.round(total * 0.18);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = async () => {
    await checkout();
    setShowRazorpay(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <>
        <PageBanner title="Order Confirmed" />
        <section className="lms-catalog">
          <div className="container">
            <div className="lms-empty">
              <div className="lms-empty__icon">🎉</div>
              <h3 className="lms-empty__title">Payment Successful!</h3>
              <p className="lms-empty__text">
                You've been enrolled in your purchased courses. Start learning now!
              </p>
              <Link to="/dashboard" className="btn-primary">
                Go to My Learning
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageBanner title="Shopping Cart" />
      <section className="lms-catalog">
        <div className="container">
          {courses.length === 0 ? (
            <div className="lms-empty">
              <div className="lms-empty__icon">🛒</div>
              <h3 className="lms-empty__title">Your cart is empty</h3>
              <p className="lms-empty__text">
                Browse courses and add them to your cart.
              </p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="lms-cart">
              <div className="lms-cart__items">
                <h2>{courses.length} Course{courses.length > 1 ? 's' : ''} in Cart</h2>
                {courses.map((course) => (
                  <div key={course.id} className="lms-cart__item">
                    <img src={course.image} alt={course.title} />
                    <div className="lms-cart__item-info">
                      <Link to={`/courses/${course.id}`}>
                        <h4>{course.title}</h4>
                      </Link>
                      <p>{course.instructor} · {course.duration}</p>
                      <button
                        className="lms-cart__remove"
                        onClick={() => removeFromCart(course.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="lms-cart__price">₹{course.price}</div>
                  </div>
                ))}
              </div>

              <aside className="lms-cart__summary">
                <h3>Order Summary</h3>
                <div className="lms-cart__line">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="lms-cart__line">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(total * 0.18)}</span>
                </div>
                <div className="lms-cart__line lms-cart__line--total">
                  <span>Total</span>
                  <span>₹{total + Math.round(total * 0.18)}</span>
                </div>
                <button
                  className="lms-cart__checkout"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
                <p className="lms-cart__note">
                  🔒 Secured by Razorpay (Demo Mode)
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>

      {showRazorpay && (
        <RazorpayDemo
          amount={grandTotal}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowRazorpay(false)}
        />
      )}
    </>
  );
}

export default Cart;
