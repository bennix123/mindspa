import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';

function Discussion({ lessonId }) {
  const { getDiscussions, addDiscussion, addReply, user } = useLMS();
  const discussions = getDiscussions(lessonId);
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const result = addDiscussion(lessonId, content.trim());
    if (result.success) setContent('');
  };

  const handleReply = (discussionId) => {
    if (!replyContent.trim()) return;
    addReply(lessonId, discussionId, replyContent.trim());
    setReplyContent('');
    setReplyTo(null);
  };

  return (
    <div className="lms-discussion">
      <h3>💬 Discussion ({discussions.length})</h3>

      {user ? (
        <form onSubmit={handlePost} className="lms-discussion__form">
          <textarea
            placeholder="Ask a question or share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <button type="submit" disabled={!content.trim()}>
            Post
          </button>
        </form>
      ) : (
        <p className="lms-discussion__notice">
          <Link to="/login">Sign in</Link> to join the discussion.
        </p>
      )}

      <div className="lms-discussion__list">
        {discussions.length === 0 ? (
          <p className="lms-discussion__empty">
            No discussions yet. Start the conversation!
          </p>
        ) : (
          discussions.map((d) => (
            <div key={d.id} className="lms-discussion-item">
              <div className="lms-discussion-item__header">
                <div className="lms-discussion-item__avatar">
                  {d.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{d.userName}</strong>
                  <div className="lms-discussion-item__date">
                    {new Date(d.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <p>{d.content}</p>

              {user && (
                <button
                  className="lms-discussion-item__reply-btn"
                  onClick={() => setReplyTo(replyTo === d.id ? null : d.id)}
                >
                  {replyTo === d.id ? 'Cancel' : 'Reply'}
                </button>
              )}

              {replyTo === d.id && (
                <div className="lms-discussion-item__reply-form">
                  <textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                  />
                  <button onClick={() => handleReply(d.id)}>Post Reply</button>
                </div>
              )}

              {d.replies.length > 0 && (
                <div className="lms-discussion-item__replies">
                  {d.replies.map((r) => (
                    <div key={r.id} className="lms-discussion-reply">
                      <div className="lms-discussion-item__header">
                        <div className="lms-discussion-item__avatar">
                          {r.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{r.userName}</strong>
                          <div className="lms-discussion-item__date">
                            {new Date(r.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <p>{r.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Discussion;
