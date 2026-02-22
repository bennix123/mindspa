import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import './Blog.css';

const BlogCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/blog/${post.id}`}
      className="blog-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="blog-image">
        <div className="blog-date">
          <span className="date-number">{post.date}</span>
          <span className="date-month">{post.month}</span>
        </div>
        <div className="blog-image-placeholder">
          <span className={`blog-emoji ${isHovered ? 'float' : ''}`}>
            {post.image}
          </span>
        </div>
        <div className={`blog-read-more ${isHovered ? 'active' : ''}`}>
          <span>Read More →</span>
        </div>
      </div>
      <div className="blog-content">
        <span className="blog-category">{post.category}</span>
        <h3>{post.title}</h3>
      </div>
    </Link>
  );
};

const Blog = () => {
  const { posts } = useContent();

  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <span className="section-label">BLOG</span>
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Read our latest articles on mental health, wellness, and personal development.
        </p>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-outline">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default Blog;

