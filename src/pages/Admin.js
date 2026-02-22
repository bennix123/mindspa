import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import './Admin.css';

const defaultPost = { date: '', month: '', category: '', title: '', image: '📝' };
const defaultPodcast = { title: '', episode: '', link: '', description: '', thumbnail: '🎙️' };
const defaultReel = { title: '', link: '', thumbnail: '🎬', description: '' };

function Admin() {
  const [message, setMessage] = useState(null);
  const {
    posts,
    podcasts,
    reels,
    addPost,
    updatePost,
    deletePost,
    addPodcast,
    updatePodcast,
    deletePodcast,
    addReel,
    updateReel,
    deleteReel,
  } = useContent();

  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPodcastId, setEditingPodcastId] = useState(null);
  const [editingReelId, setEditingReelId] = useState(null);

  const [postForm, setPostForm] = useState(defaultPost);
  const [podcastForm, setPodcastForm] = useState(defaultPodcast);
  const [reelForm, setReelForm] = useState(defaultReel);

  const showMessage = (text) => {
    setMessage(text);
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  };

  const clearPostForm = () => {
    setPostForm(defaultPost);
    setEditingPostId(null);
  };
  const clearPodcastForm = () => {
    setPodcastForm(defaultPodcast);
    setEditingPodcastId(null);
  };
  const clearReelForm = () => {
    setReelForm(defaultReel);
    setEditingReelId(null);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postForm.title.trim()) return;
    if (editingPostId) {
      updatePost(editingPostId, postForm);
      showMessage('Post updated.');
    } else {
      addPost(postForm);
      showMessage('Post added.');
    }
    clearPostForm();
  };

  const handlePodcastSubmit = (e) => {
    e.preventDefault();
    if (!podcastForm.title.trim()) return;
    if (editingPodcastId) {
      updatePodcast(editingPodcastId, podcastForm);
      showMessage('Podcast highlight updated.');
    } else {
      addPodcast(podcastForm);
      showMessage('Podcast highlight added.');
    }
    clearPodcastForm();
  };

  const handleReelSubmit = (e) => {
    e.preventDefault();
    if (!reelForm.title.trim()) return;
    if (editingReelId) {
      updateReel(editingReelId, reelForm);
      showMessage('Reel updated.');
    } else {
      addReel(reelForm);
      showMessage('Reel added.');
    }
    clearReelForm();
  };

  const startEditPost = (p) => {
    setPostForm({ date: p.date, month: p.month, category: p.category, title: p.title, image: p.image || '📝' });
    setEditingPostId(p.id);
  };
  const startEditPodcast = (p) => {
    setPodcastForm({
      title: p.title,
      episode: p.episode || '',
      link: p.link || '',
      description: p.description || '',
      thumbnail: p.thumbnail || '🎙️',
    });
    setEditingPodcastId(p.id);
  };
  const startEditReel = (r) => {
    setReelForm({
      title: r.title,
      link: r.link || '',
      thumbnail: r.thumbnail || '🎬',
      description: r.description || '',
    });
    setEditingReelId(r.id);
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="container">
          <Link to="/" className="admin-back">
            ← Back to site
          </Link>
          <h1>Admin</h1>
          <p>Manage blog posts, podcast highlights, and reels.</p>
        </div>
      </header>

      <main className="admin-main container">
        {message && (
          <div className="admin-message" role="alert">
            {message}
          </div>
        )}

        {/* Blog Posts */}
        <section className="admin-section">
          <h2>Blog Posts</h2>
          <p className="admin-section-desc">These appear in the Blog section on the homepage.</p>
          <form className="admin-form" onSubmit={handlePostSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Date (e.g. 15)</label>
                <input
                  value={postForm.date}
                  onChange={(e) => setPostForm((f) => ({ ...f, date: e.target.value }))}
                  placeholder="15"
                />
              </div>
              <div className="form-group">
                <label>Month (e.g. Aug)</label>
                <input
                  value={postForm.month}
                  onChange={(e) => setPostForm((f) => ({ ...f, month: e.target.value }))}
                  placeholder="Aug"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  value={postForm.category}
                  onChange={(e) => setPostForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Self-Help"
                />
              </div>
              <div className="form-group">
                <label>Image (emoji)</label>
                <input
                  value={postForm.image}
                  onChange={(e) => setPostForm((f) => ({ ...f, image: e.target.value || '📝' }))}
                  placeholder="📝"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                value={postForm.title}
                onChange={(e) => setPostForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Post title"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="admin-btn">
                {editingPostId ? 'Update post' : 'Add post'}
              </button>
              {editingPostId && (
                <button type="button" className="admin-btn admin-btn-secondary" onClick={clearPostForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="admin-list">
            <h3>Current posts</h3>
            {posts.length === 0 ? (
              <p className="admin-empty">No posts yet. Add one above.</p>
            ) : (
              <ul>
                {posts.map((p) => (
                  <li key={p.id}>
                    <span title={p.title}>{p.title.slice(0, 50)}{p.title.length > 50 ? '…' : ''}</span>
                    <span className="admin-meta">{p.date} {p.month} · {p.category}</span>
                    <button type="button" className="admin-edit" onClick={() => startEditPost(p)}>Edit</button>
                    <button type="button" className="admin-delete" onClick={() => { deletePost(p.id); showMessage('Post deleted.'); }}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Podcast Highlights */}
        <section className="admin-section">
          <h2>Podcast Highlights</h2>
          <p className="admin-section-desc">Shown in the Podcast Highlights section on the homepage.</p>
          <form className="admin-form" onSubmit={handlePodcastSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                value={podcastForm.title}
                onChange={(e) => setPodcastForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Understanding Anxiety"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Episode (e.g. Ep 1)</label>
                <input
                  value={podcastForm.episode}
                  onChange={(e) => setPodcastForm((f) => ({ ...f, episode: e.target.value }))}
                  placeholder="Ep 1"
                />
              </div>
              <div className="form-group">
                <label>Thumbnail (emoji)</label>
                <input
                  value={podcastForm.thumbnail}
                  onChange={(e) => setPodcastForm((f) => ({ ...f, thumbnail: e.target.value || '🎙️' }))}
                  placeholder="🎙️"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Link (URL)</label>
              <input
                type="url"
                value={podcastForm.link}
                onChange={(e) => setPodcastForm((f) => ({ ...f, link: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={podcastForm.description}
                onChange={(e) => setPodcastForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description"
                rows={2}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="admin-btn">
                {editingPodcastId ? 'Update podcast' : 'Add podcast'}
              </button>
              {editingPodcastId && (
                <button type="button" className="admin-btn admin-btn-secondary" onClick={clearPodcastForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="admin-list">
            <h3>Current podcast highlights</h3>
            {podcasts.length === 0 ? (
              <p className="admin-empty">No podcast highlights yet. Add one above.</p>
            ) : (
              <ul>
                {podcasts.map((p) => (
                  <li key={p.id}>
                    <span>{p.episode} – {p.title}</span>
                    <button type="button" className="admin-edit" onClick={() => startEditPodcast(p)}>Edit</button>
                    <button type="button" className="admin-delete" onClick={() => { deletePodcast(p.id); showMessage('Podcast deleted.'); }}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Reels */}
        <section className="admin-section">
          <h2>Reels &amp; Blog Links</h2>
          <p className="admin-section-desc">Shown in the Reels &amp; Blog Links section on the homepage.</p>
          <form className="admin-form" onSubmit={handleReelSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                value={reelForm.title}
                onChange={(e) => setReelForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Stress Relief Tips"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Thumbnail (emoji)</label>
                <input
                  value={reelForm.thumbnail}
                  onChange={(e) => setReelForm((f) => ({ ...f, thumbnail: e.target.value || '🎬' }))}
                  placeholder="🎬"
                />
              </div>
              <div className="form-group">
                <label>Link (URL)</label>
                <input
                  type="url"
                  value={reelForm.link}
                  onChange={(e) => setReelForm((f) => ({ ...f, link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={reelForm.description}
                onChange={(e) => setReelForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description"
                rows={2}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="admin-btn">
                {editingReelId ? 'Update reel' : 'Add reel'}
              </button>
              {editingReelId && (
                <button type="button" className="admin-btn admin-btn-secondary" onClick={clearReelForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="admin-list">
            <h3>Current reels</h3>
            {reels.length === 0 ? (
              <p className="admin-empty">No reels yet. Add one above.</p>
            ) : (
              <ul>
                {reels.map((r) => (
                  <li key={r.id}>
                    <span>{r.title}</span>
                    <button type="button" className="admin-edit" onClick={() => startEditReel(r)}>Edit</button>
                    <button type="button" className="admin-delete" onClick={() => { deleteReel(r.id); showMessage('Reel deleted.'); }}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;
