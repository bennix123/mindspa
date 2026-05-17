import React from 'react';
import PageBanner from '../components/PageBanner';

const BOOKS = [
  {
    title: 'Psychology of Self-Talk',
    subtitle: '7 Mindfulness Mantras for a Happier, Healthier and Successful You',
    author: 'Prof. Manju Agrawal',
    cover: '/client-pic/book-psychology-self-talk.jpeg',
    desc: 'A transformative guide from Professor Emeritus Dr. Manju Agrawal exploring how your inner dialogue shapes your mental health, relationships, and success. Drawing on 40+ years of clinical and teaching experience in psychology and hypnotherapy, this book offers 7 practical mantras for rewiring self-talk.',
    price: 499,
    pages: 240,
  },
];

const styles = {
  section: { padding: '60px 0 80px', background: 'var(--bg-white)' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '28px',
    marginTop: '40px',
    maxWidth: 420,
    margin: '40px auto 0',
  },
  card: {
    background: 'var(--bg-white)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cover: {
    width: '100%',
    height: 400,
    objectFit: 'cover',
    objectPosition: 'center',
  },
  body: { padding: 20 },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 18,
    fontWeight: 500,
    color: 'var(--text-heading)',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  author: {
    fontSize: 12,
    color: 'var(--accent)',
    fontWeight: 600,
    marginBottom: 12,
  },
  desc: {
    fontSize: 13,
    color: 'var(--text-body)',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTop: '1px solid var(--border-light)',
  },
  price: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 20,
    fontWeight: 500,
    color: 'var(--text-heading)',
  },
  pages: { fontSize: 12, color: 'var(--text-light)' },
};

function BooksPage() {
  return (
    <>
      <PageBanner title="Books" />

      <section style={styles.section}>
        <div className="container">
          <h2 className="section-title">Books by MindSpa</h2>
          <p className="section-subtitle">
            Evidence-based reads on psychology, therapy & personal growth
          </p>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>

          <div style={styles.grid}>
            {BOOKS.map((b, i) => (
              <div
                key={i}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img src={b.cover} alt={b.title} style={styles.cover} />
                <div style={styles.body}>
                  <h3 style={styles.title}>{b.title}</h3>
                  {b.subtitle && (
                    <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--text-light)', marginBottom: 8, lineHeight: 1.4 }}>
                      {b.subtitle}
                    </p>
                  )}
                  <p style={styles.author}>by {b.author}</p>
                  <p style={styles.desc}>{b.desc}</p>
                  <div style={styles.meta}>
                    <span style={styles.price}>₹{b.price}</span>
                    <span style={styles.pages}>{b.pages} pages</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <p style={{ fontSize: 15, color: 'var(--text-body)', marginBottom: 20 }}>
              Books are available as hardcover and ebook. Contact us to order.
            </p>
            <a href="/contact" className="btn-primary">
              Contact to Order
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default BooksPage;
