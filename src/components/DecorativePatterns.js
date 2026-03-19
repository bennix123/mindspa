import React from 'react';
import './DecorativePatterns.css';

/* Reusable floating decorative shapes — placed around sections for visual richness */

export const CirclePattern = ({ className = '', style = {} }) => (
  <div className={`deco-pattern deco-circle-pattern ${className}`} style={style} aria-hidden="true">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {[...Array(5)].map((_, i) => (
        <circle key={i} cx="60" cy="60" r={15 + i * 12} stroke="currentColor" strokeWidth="1" opacity={0.15 - i * 0.02} />
      ))}
    </svg>
  </div>
);

export const DotGrid = ({ className = '', style = {}, rows = 5, cols = 5 }) => (
  <div className={`deco-pattern deco-dot-grid ${className}`} style={style} aria-hidden="true">
    <svg width={cols * 16} height={rows * 16} viewBox={`0 0 ${cols * 16} ${rows * 16}`} fill="currentColor">
      {[...Array(rows)].map((_, r) =>
        [...Array(cols)].map((__, c) => (
          <circle key={`${r}-${c}`} cx={8 + c * 16} cy={8 + r * 16} r="2" opacity="0.2" />
        ))
      )}
    </svg>
  </div>
);

export const TriangleDots = ({ className = '', style = {} }) => (
  <div className={`deco-pattern deco-triangle ${className}`} style={style} aria-hidden="true">
    <svg width="80" height="70" viewBox="0 0 80 70" fill="currentColor">
      <circle cx="40" cy="5" r="2.5" opacity="0.25" />
      <circle cx="25" cy="25" r="2.5" opacity="0.2" />
      <circle cx="55" cy="25" r="2.5" opacity="0.2" />
      <circle cx="10" cy="45" r="2.5" opacity="0.15" />
      <circle cx="40" cy="45" r="2.5" opacity="0.15" />
      <circle cx="70" cy="45" r="2.5" opacity="0.15" />
      <circle cx="0" cy="65" r="2.5" opacity="0.1" />
      <circle cx="26" cy="65" r="2.5" opacity="0.1" />
      <circle cx="53" cy="65" r="2.5" opacity="0.1" />
      <circle cx="80" cy="65" r="2.5" opacity="0.1" />
    </svg>
  </div>
);

export const FloatingShape = ({ className = '', style = {}, shape = 'circle' }) => (
  <div className={`deco-pattern deco-floating deco-floating--${shape} ${className}`} style={style} aria-hidden="true" />
);

export const ShapeLines = ({ className = '', style = {} }) => (
  <div className={`deco-pattern deco-shape-lines ${className}`} style={style} aria-hidden="true">
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 90 Q 50 10, 90 50" opacity="0.1" />
      <path d="M20 90 Q 55 20, 90 60" opacity="0.08" />
      <path d="M30 90 Q 60 30, 90 70" opacity="0.06" />
    </svg>
  </div>
);
