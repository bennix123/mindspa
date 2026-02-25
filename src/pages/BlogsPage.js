import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import PageBanner from '../components/PageBanner';

const BLOG_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=600',
];

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
    background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--body-text)',
    fontSize: '16px',
  },
};

function BlogsPage() {
  const { posts } = useContent();

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

          {!posts || posts.length === 0 ? (
            <div style={blogsStyles.empty}>
              <p>No blog posts available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div style={blogsStyles.grid} className="blogs-grid">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  style={blogsStyles.card}
                  className="blog-page-card"
                >
                  <div style={blogsStyles.imageWrap}>
                    <img
                      src={BLOG_IMAGES[index % BLOG_IMAGES.length]}
                      alt={post.title}
                      style={blogsStyles.image}
                    />
                    <div style={blogsStyles.dateBadge}>
                      <span style={blogsStyles.dateNum}>{post.date}</span>
                      <span style={blogsStyles.dateMonth}>{post.month}</span>
                    </div>
                  </div>
                  <div style={blogsStyles.cardBody}>
                    <span style={blogsStyles.category}>{post.category}</span>
                    <h3 style={blogsStyles.title}>{post.title}</h3>
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
