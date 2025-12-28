import React, { useEffect, useState } from 'react';
import { fetchPosts, addPost } from './FeedView.api';

function LikeButton({ count: initialCount }) {
  const [count, setCount] = useState(initialCount || 0);
  const [liked, setLiked] = useState(false);
  return (
    <button
      style={{ background: liked ? '#3A8DFF' : '#333', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', marginRight: 10, cursor: 'pointer' }}
      onClick={() => { setLiked(!liked); setCount(c => c + (liked ? -1 : 1)); }}
    >
      👍 {count}
    </button>
  );
}

function Comments({ post }) {
  const [comments, setComments] = useState(post.comments || []);
  const [comment, setComment] = useState('');
  function handleAddComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, { user: 'Drip God', text: comment, timestamp: Date.now() }]);
    setComment('');
  }
  return (
    <div style={{ marginTop: 10 }}>
      <form onSubmit={handleAddComment} style={{ display: 'flex', gap: 8 }}>
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181A20', color: '#fff' }}
        />
        <button type="submit" style={{ background: '#3A8DFF', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px' }}>Comment</button>
      </form>
      <div style={{ marginTop: 8 }}>
        {comments.map((c, i) => (
          <div key={i} style={{ fontSize: 14, color: '#ccc', marginBottom: 4 }}>
            <b style={{ color: '#8ecfff' }}>{c.user}</b> <span style={{ color: '#888', fontSize: 12 }}>{new Date(c.timestamp).toLocaleString()}</span>
            <div style={{ marginLeft: 8 }}>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeedView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setPosting(true);
    setError(null);
    try {
      const newPost = await addPost({ user: 'Drip God', content });
      setPosts([{ ...newPost, comments: [], likes: 0 }, ...posts]);
      setContent('');
    } catch (e) {
      setError(e.message);
    } finally {
      setPosting(false);
    }
  }

  return (
    <div>
      <h2>Feed</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          style={{ width: '60%', padding: 8 }}
          disabled={posting}
        />
        <button type="submit" disabled={posting || !content.trim()} style={{ marginLeft: 10 }}>
          {posting ? 'Posting...' : 'Post'}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {!loading && posts.length === 0 && <p style={{ color: '#888' }}>No posts yet. Be the first to post!</p>}
        {posts.map(post => (
          <div key={post.id || post.timestamp} style={{ background: '#222', margin: '10px 0', padding: 16, borderRadius: 8 }}>
            <b>{post.user}</b> <span style={{ color: '#888', fontSize: 12 }}>{new Date(post.timestamp).toLocaleString()}</span>
            <div style={{ marginTop: 8 }}>{post.content}</div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
              <LikeButton count={post.likes || 0} />
            </div>
            <Comments post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
