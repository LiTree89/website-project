import React, { useEffect, useState } from 'react';
import { fetchPosts, addPost } from './FeedView.api';

export default function FeedView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setPosting(true);
    try {
      const newPost = await addPost({ user: 'Drip God', content });
      setPosts([newPost, ...posts]);
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
        {posts.map(post => (
          <div key={post.id || post.timestamp} style={{ background: '#222', margin: '10px 0', padding: 16, borderRadius: 8 }}>
            <b>{post.user}</b> <span style={{ color: '#888', fontSize: 12 }}>{new Date(post.timestamp).toLocaleString()}</span>
            <div style={{ marginTop: 8 }}>{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
