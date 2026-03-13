import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import PageBanner from '../components/PageBanner';

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600';

const blogsStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'var(--body-text)',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
  },
  card: {
    background: 'var(--light-grey)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    border: '1px solid var(--border-light)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/10',
    overflow: 'hidden',
    background: '#e8ecef',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  dateBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'var(--blue)',
    color: '#fff',
    borderRadius: '8px',
    padding: '6px 10px',
    textAlign: 'center',
    lineHeight: 1.1,
    zIndex: 1,
  },
  dateNum: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 700,
  },
  dateMonth: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardBody: {
    padding: '20px',
  },
  category: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--blue)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    lineHeight: 1.35,
    margin: 0,
    marginBottom: '8px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  excerpt: {
    fontSize: '13px',
    color: 'var(--body-text)',
    lineHeight: 1.5,
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    opacity: 0.75,
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--body-text)',
    fontSize: '16px',
  },
};

function SkeletonCard() {
  return (
    <div className="blog-skeleton-card">
      <div className="blog-skeleton-image" />
      <div className="blog-skeleton-body">
        <div className="blog-skeleton-line short" />
        <div className="blog-skeleton-line" />
        <div className="blog-skeleton-line medium" />
      </div>
    </div>
  );
}

function BlogsPage() {
  const { posts, postsLoading } = useContent();

  return (
    <>
      <PageBanner title="Blogs" />

      <section style={blogsStyles.section}>
        <div className="container">
          <h2 className="section-title">Latest Articles</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p style={blogsStyles.subtitle}>
            Explore our latest insights on mental health, wellness, and personal
            development.
          </p>

          {postsLoading ? (
            <div style={blogsStyles.grid} className="blogs-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : !posts || posts.length === 0 ? (
            <div style={blogsStyles.empty}>
              <p>No blog posts available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div style={blogsStyles.grid} className="blogs-grid">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  style={blogsStyles.card}
                  className="blog-page-card"
                >
                  <div style={blogsStyles.imageWrap}>
                    <img
                      src={post.image || FALLBACK_IMAGE}
                      alt={post.title}
                      style={blogsStyles.image}
                      loading="lazy"
                    />
                    <div style={blogsStyles.dateBadge}>
                      <span style={blogsStyles.dateNum}>{post.date}</span>
                      <span style={blogsStyles.dateMonth}>{post.month}</span>
                    </div>
                  </div>
                  <div style={blogsStyles.cardBody}>
                    <span style={blogsStyles.category}>{post.category}</span>
                    <h3 style={blogsStyles.title}>{post.title}</h3>
                    {post.excerpt && (
                      <p style={blogsStyles.excerpt}>{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .blog-page-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        /* Skeleton loading */
        .blog-skeleton-card {
          border-radius: var(--radius-md, 12px);
          overflow: hidden;
          border: 1px solid var(--border-light, #e8ecef);
          background: var(--light-grey, #f8f9fa);
        }
        .blog-skeleton-image {
          width: 100%;
          aspect-ratio: 16/10;
          background: linear-gradient(90deg, #e8ecef 25%, #f3f4f6 50%, #e8ecef 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
        }
        .blog-skeleton-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .blog-skeleton-line {
          height: 14px;
          border-radius: 6px;
          background: linear-gradient(90deg, #e8ecef 25%, #f3f4f6 50%, #e8ecef 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
          width: 100%;
        }
        .blog-skeleton-line.short { width: 40%; height: 10px; }
        .blog-skeleton-line.medium { width: 70%; }
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 1024px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .blogs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default BlogsPage;
