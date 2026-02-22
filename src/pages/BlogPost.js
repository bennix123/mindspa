import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle';
import './BlogPost.css';

const DEFAULT_CONTENT = 'This article is part of our blog on mental health, wellness, and personal development. For more support, explore our services or book an appointment with our team.';

const CATEGORIES = ['Holistic Health', 'Self-Help', 'Technology', 'Gen Z Wellness', 'Hypnotherapy'];

const TAG_LIST = ['Mental Health', 'Wellness', 'Therapy', 'Mindfulness', 'Self-Care', 'Anxiety', 'Healing'];

function BlogPost() {
  const { id } = useParams();
  const { posts } = useContent();
  const post = posts ? posts.find((p) => p.id === id) : null;
  const relatedPosts = posts ? posts.filter((p) => p.id !== id).slice(0, 3) : [];

  if (!post) {
    return (
      <div className="App">
        <Header />
        <main className="blog-post-page">
          <div className="container">
            <div className="blog-post-not-found">
              <h1>Post not found</h1>
              <p>The blog post you're looking for doesn't exist or may have been removed.</p>
              <Link to="/#blog" className="btn btn-primary">Back to Blog</Link>
            </div>
          </div>
        </main>
        <Footer />
        <DarkModeToggle />
      </div>
    );
  }

  const content = post.content || DEFAULT_CONTENT;
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="App">
      <Header />

      {/* Page Hero Banner */}
      <section className="bp-hero-banner">
        <div className="bp-hero-overlay" />
        <div className="bp-hero-pattern" />
        <div className="container bp-hero-inner">
          <span className="bp-hero-category">{post.category}</span>
          <h1 className="bp-hero-title">{post.title}</h1>
          <div className="bp-hero-meta">
            <span className="bp-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {post.date} {post.month}
            </span>
            <span className="bp-meta-sep">•</span>
            <span className="bp-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              MindSpa Team
            </span>
            <span className="bp-meta-sep">•</span>
            <span className="bp-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              5 min read
            </span>
          </div>
          <nav className="bp-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/#blog">Blog</Link>
            <span>/</span>
            <span>{post.category}</span>
          </nav>
        </div>
      </section>

      <main className="blog-post-page">
        <div className="container bp-layout">

          {/* Main Article */}
          <article className="bp-article">
            {/* Featured Image */}
            <div className="bp-featured-image">
              <div className="bp-featured-icon">{post.image}</div>
              <div className="bp-featured-gradient" />
            </div>

            {/* Article Body */}
            <div className="bp-body">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="bp-tags">
              <span className="bp-tags-label">Tags:</span>
              {TAG_LIST.slice(0, 4).map((tag) => (
                <span key={tag} className="bp-tag">{tag}</span>
              ))}
            </div>

            {/* Share */}
            <div className="bp-share">
              <span className="bp-share-label">Share:</span>
              <div className="bp-share-buttons">
                <button className="bp-share-btn bp-share-fb" aria-label="Share on Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </button>
                <button className="bp-share-btn bp-share-tw" aria-label="Share on Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </button>
                <button className="bp-share-btn bp-share-wa" aria-label="Share on WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                </button>
                <button className="bp-share-btn bp-share-li" aria-label="Share on LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </button>
              </div>
            </div>

            {/* Author Card */}
            <div className="bp-author-card">
              <div className="bp-author-avatar">
                <span>MS</span>
              </div>
              <div className="bp-author-info">
                <span className="bp-author-label">Written by</span>
                <h4 className="bp-author-name">MindSpa Team</h4>
                <p className="bp-author-bio">Our team of certified therapists and wellness experts are dedicated to sharing evidence-based insights for mental health and well-being.</p>
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="bp-footer-nav">
              <Link to="/#blog" className="btn btn-outline">← All Posts</Link>
              <Link to="/#contact" className="btn btn-primary">Book Appointment</Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="bp-sidebar">

            {/* Appointment CTA */}
            <div className="bp-sidebar-cta">
              <div className="bp-sidebar-cta-icon">🧠</div>
              <h3>Need Support?</h3>
              <p>Our therapists are here to help. Book a session today and take the first step toward wellness.</p>
              <Link to="/#contact" className="btn btn-primary bp-sidebar-btn">Book Appointment</Link>
            </div>

            {/* Categories */}
            <div className="bp-sidebar-widget">
              <h4 className="bp-widget-title">Categories</h4>
              <ul className="bp-category-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat} className={`bp-category-item ${cat === post.category ? 'active' : ''}`}>
                    <span className="bp-cat-arrow">›</span>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            {relatedPosts.length > 0 && (
              <div className="bp-sidebar-widget">
                <h4 className="bp-widget-title">Recent Posts</h4>
                <ul className="bp-recent-list">
                  {relatedPosts.map((rp) => (
                    <li key={rp.id} className="bp-recent-item">
                      <Link to={`/blog/${rp.id}`} className="bp-recent-link">
                        <div className="bp-recent-thumb">{rp.image}</div>
                        <div className="bp-recent-info">
                          <span className="bp-recent-date">{rp.date} {rp.month}</span>
                          <span className="bp-recent-title">{rp.title}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags Widget */}
            <div className="bp-sidebar-widget">
              <h4 className="bp-widget-title">Popular Tags</h4>
              <div className="bp-tag-cloud">
                {TAG_LIST.map((tag) => (
                  <span key={tag} className="bp-tag">{tag}</span>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
}

export default BlogPost;
