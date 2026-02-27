import React from 'react';
import { useTilt } from '../hooks/useTilt';

/**
 * Reusable wrapper that applies 3D mouse-following tilt effect.
 * Desktop only — tilt is disabled on mobile via the useTilt hook.
 */
const TiltCard = ({ children, className = '', maxTilt = 6, ...props }) => {
  const tiltRef = useTilt(maxTilt);

  return (
    <div ref={tiltRef} className={`tilt-card ${className}`} {...props}>
      {children}
    </div>
  );
};

export default TiltCard;
