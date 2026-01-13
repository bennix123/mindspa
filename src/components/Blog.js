import React, { useState } from 'react';
import './Blog.css';

const BlogCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      key={index} 
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
    </div>
  );
};

const Blog = () => {
  const blogPosts = [
    {
      date: '15',
      month: 'Aug',
      category: 'Holistic Health',
      title: 'The Rise of Holistic Mental Health – Blending Mind, Body, and Social Well-being',
      image: '🧘'
    },
    {
      date: '15',
      month: 'Aug',
      category: 'Self-Help',
      title: 'Stress, Anxiety & Depression – Practical Self-Help Strategies That Work',
      image: '💆'
    },
    {
      date: '15',
      month: 'Aug',
      category: 'Technology',
      title: 'Embracing Technology for Better Mental Health: Digital Therapy & AI in 2025',
      image: '💻'
    },
    {
      date: '14',
      month: 'Aug',
      category: 'Gen Z Wellness',
      title: 'Navigating Breakups and Emotional Wellness for Gen Z – Coping, Growth, and Healing',
      image: '❤️'
    },
    {
      date: '12',
      month: 'Aug',
      category: 'Hypnotherapy',
      title: 'Top 7 Myths About Hypnotherapy, Debunking the Misconceptions',
      image: '🔮'
    },
    {
      date: '12',
      month: 'Aug',
      category: 'Hypnotherapy',
      title: 'No, Hypnotherapy Won\'t Control Your Mind, But It Might Change Your Life',
      image: '✨'
    }
  ];

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <span className="section-label">BLOG</span>
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Read our latest articles on mental health, wellness, and personal development.
        </p>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
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

