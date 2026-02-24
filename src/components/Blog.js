import React, { useState } from 'react';
import './Blog.css';
import { useContent } from '../context/ContentContext';

const BLOG_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const BlogCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = BLOG_IMAGES[index % BLOG_IMAGES.length];

  return (
    <div
      className="blog-card fade-in"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="blog-image">
        <img src={imgSrc} alt={post.title} className="blog-photo" />
        <div className="blog-date">
          <span className="date-number">{post.date}</span>
          <span className="date-month">{post.month}</span>
        </div>
        <div className={`blog-read-more ${isHovered ? 'active' : ''}`}>
          <span>Read More →</span>
        </div>
      </div>
      <div className="blog-content">
        <span className="blog-category">{post.category}</span>
        <h3>{post.title}</h3>
      </div>
    </div>
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
          {posts.slice(0, 6).map((post, index) => (
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
