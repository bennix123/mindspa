import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Blog.css';

const BLOG_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const Blog = () => {
  const { posts } = useContent();
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 200, childSelector: '.blog-card' });

  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);

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
          {displayPosts.map((post, index) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="blog-card stagger-item">
              <div className="blog-card__image">
                <img src={BLOG_IMAGES[index % BLOG_IMAGES.length]} alt={post.title} />
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
          ))}
        </div>

        <div className="blog-section__cta">
          <Link to="/blogs" className="btn-outline">View All Posts</Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
