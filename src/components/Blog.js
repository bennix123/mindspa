import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Blog.css';

const BLOG_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const BlogCard = ({ post, index, hasImage }) => {
  const imgSrc = BLOG_IMAGES[index % BLOG_IMAGES.length];

  return (
    <Link to={`/blog/${post.id}`} className="blog-card stagger-item hover-lift">
      {hasImage && (
        <div className="blog-card-image">
          <img src={imgSrc} alt={post.title} />
          <div className="blog-date-badge">
            <span className="blog-date-day">{post.date}</span>
            <span className="blog-date-month">{post.month}</span>
          </div>
        </div>
      )}
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-meta-item">
            <svg className="blog-meta-icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1c-3.315 0-6 1.79-6 4v1h12v-1c0-2.21-2.685-4-6-4z"/>
            </svg>
            Raunik
          </span>
          <span className="blog-meta-item">
            <svg className="blog-meta-icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764a1.5 1.5 0 0 1 1.06.44l.774.773A1.5 1.5 0 0 0 8.158 3.5H13.5A1.5 1.5 0 0 1 15 5v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9z"/>
            </svg>
            {post.category || 'Uncategorized'}
          </span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
      </div>
    </Link>
  );
};

const Blog = () => {
  const { posts } = useContent();
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 100 });

  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 9);
  const topRowCount = Math.min(3, displayPosts.length);
  const topRow = displayPosts.slice(0, topRowCount);
  const bottomRow = displayPosts.slice(topRowCount, 9);

  return (
    <section className="blog-section">
      <div className="container">
        <div ref={titleRef} className={`reveal reveal-up ${titleVis ? 'visible' : ''}`}>
          <h2 className="section-title">Blog</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="blog-grid" ref={gridRef}>
          {topRow.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} hasImage={false} />
          ))}
          {bottomRow.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + topRowCount} hasImage={true} />
          ))}
        </div>

        <div className="blog-read-more-wrap">
          <Link to="/blogs" className="btn-primary">Read More</Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
