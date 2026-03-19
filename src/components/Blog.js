import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Blog.css';

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600';

const Blog = () => {
  const { posts, postsLoading } = useContent();
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useRef(null);

  // Re-trigger stagger reveal when posts finish loading
  useEffect(() => {
    const container = gridRef.current;
    if (postsLoading || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll('.blog-card');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 200}ms`;
            child.classList.add('revealed');
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [postsLoading]);

  if (!postsLoading && (!posts || posts.length === 0)) return null;

  const displayPosts = postsLoading ? [] : posts.slice(0, 3);

  return (
    <section className="blog-section">
      <div className="container">
        <div ref={titleRef} className={`blog-section__header ${titleVis ? 'visible' : ''}`}>
          <p className="section-label">Recent Blog</p>
          <h2 className="section-title">Get Latest Tips & Tricks</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="blog-grid" ref={gridRef}>
          {postsLoading ? (
            [1, 2, 3].map((i) => (
              <div key={`skeleton-${i}`} className="blog-card revealed" style={{ pointerEvents: 'none' }}>
                <div className="blog-card__image" style={{ background: '#e8ecef' }}>
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, #e8ecef 25%, #f3f4f6 50%, #e8ecef 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
                  }} />
                </div>
                <div className="blog-card__body">
                  <div style={{ width: '40%', height: 10, borderRadius: 4, background: '#e8ecef', marginBottom: 12 }} />
                  <div style={{ width: '90%', height: 16, borderRadius: 4, background: '#e8ecef', marginBottom: 8 }} />
                  <div style={{ width: '60%', height: 16, borderRadius: 4, background: '#e8ecef' }} />
                </div>
              </div>
            ))
          ) : (
            displayPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="blog-card stagger-item">
                <div className="blog-card__image">
                  <img src={post.image || FALLBACK_IMAGE} alt={post.title} loading="lazy" />
                  <div className="blog-card__date">
                    <span className="blog-card__day">{post.date}</span>
                    <span className="blog-card__month">{post.month}</span>
                  </div>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{post.category || 'Therapy'}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <span className="blog-card__readmore">
                    Read More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

        {!postsLoading && (
          <div className="blog-section__cta">
            <Link to="/blogs" className="btn-outline">View All Posts</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
