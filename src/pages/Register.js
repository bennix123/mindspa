import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function Register() {
  const { register, user } = useLMS();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    const result = await register(name.trim(), email.trim(), password);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <PageBanner title="Create Account" />
      <section className="lms-auth">
        <div className="container">
          <div className="lms-auth__card">
            <h2>Join MindSpa Learning</h2>
            <p className="lms-auth__sub">
              Start your wellness learning journey today
            </p>

            {error && <div className="lms-auth__error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="lms-auth__field">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="lms-auth__field">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="lms-auth__field">
                <label>Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>

              <div className="lms-auth__field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                />
              </div>

              <button type="submit" className="lms-auth__btn">
                Create Account
              </button>
            </form>

            <p className="lms-auth__footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
