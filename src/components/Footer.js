import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Footer.css';

const Footer = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 150, childSelector: '.footer__contact-item' });

  return (
    <footer className="footer">
      {/* Connect with us */}
      <section className="footer__connect">
        <div className="container">
          <div ref={titleRef} className={`reveal reveal-up ${titleVis ? 'visible' : ''}`}>
            <h2 className="section-title">Connect with us</h2>
            <div className="section-divider">
              <span className="line"></span>
            </div>
            <p className="footer__connect-subtitle">Transform your body, mind, and life today.</p>
          </div>

          <div className="footer__contact-grid" ref={gridRef}>
            <div className="footer__contact-item stagger-item">
              <div className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h4>ADDRESS</h4>
              <p>Lucknow, Uttar Pradesh</p>
            </div>

            <div className="footer__contact-item stagger-item">
              <div className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h4>PHONE</h4>
              <p>+91 7607588184</p>
              <p>+91 8840676202</p>
            </div>

            <div className="footer__contact-item stagger-item">
              <div className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h4>EMAIL ADDRESS</h4>
              <p>mindspalko@gmail.com</p>
            </div>

            <div className="footer__contact-item stagger-item">
              <div className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h4>BUSINESS HOURS</h4>
              <p>MON to FRI: 8AM to 6PM</p>
              <p>SAT: 9AM to 12PM</p>
            </div>
          </div>

          <div className="footer__policies">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/refund-policy">Refund &amp; Cancellation Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="footer__copyright">
        <div className="container">
          <p>Copyright &copy; {new Date().getFullYear()} Mind Spa India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
