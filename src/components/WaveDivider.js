import React from 'react';
import './WaveDivider.css';

const WaveDivider = ({ color = '#ffffff', flip = false }) => (
  <div className={`wave-divider ${flip ? 'wave-divider--flip' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="wave-path"
        d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,20 1440,40 L1440,100 L0,100 Z"
        fill={color}
      />
    </svg>
  </div>
);

export default WaveDivider;
