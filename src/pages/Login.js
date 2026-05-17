import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function Login() {
  const { login, user } = useLMS();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const redirectTo = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email.trim(), password);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <PageBanner title="Sign In" />
      <section className="lms-auth">
        <div className="container">
          <div className="lms-auth__card">
            <h2>Welcome Back</h2>
            <p className="lms-auth__sub">Sign in to continue your learning journey</p>

            {error && <div className="lms-auth__error">{error}</div>}

            <form onSubmit={handleSubmit}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="lms-auth__btn">
                Sign In
              </button>
            </form>

            <p className="lms-auth__footer">
              Don't have an account?{' '}
              <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
