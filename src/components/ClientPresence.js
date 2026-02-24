import React, { useState } from 'react';
import { clientPresenceImage, clientPresenceSlots } from '../utils/clientPic';
import './ClientPresence.css';

const ClientPresence = () => {
  const [loaded, setLoaded] = useState({});
  const [failed, setFailed] = useState({});
  const [tryPng, setTryPng] = useState({});

  const handleLoad = (n) => setLoaded((prev) => ({ ...prev, [n]: true }));
  const handleError = (n) => {
    if (!tryPng[n]) {
      setTryPng((prev) => ({ ...prev, [n]: true }));
    } else {
      setFailed((prev) => ({ ...prev, [n]: true }));
    }
  };

  const slots = Array.from({ length: clientPresenceSlots }, (_, i) => i + 1);
  const allFailed = slots.every((n) => failed[n]);

  if (allFailed) return null;

  return (
    <section id="client-presence" className="client-presence section">
      <div className="container">
        <span className="section-label">CLIENT PRESENCE</span>
        <h2 className="section-title">Our Clients</h2>
        <p className="section-subtitle">
          Real people who have chosen MindSpa for their journey to well-being.
        </p>
        <div className="client-presence-grid">
          {slots.map((n) => (
            <div
              key={n}
              className={`client-presence-item ${loaded[n] && !failed[n] ? 'loaded' : ''} ${failed[n] ? 'failed' : ''}`}
            >
              <img
                src={clientPresenceImage(n, tryPng[n])}
                alt={`Client ${n}`}
                loading="lazy"
                onLoad={() => handleLoad(n)}
                onError={() => handleError(n)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientPresence;
