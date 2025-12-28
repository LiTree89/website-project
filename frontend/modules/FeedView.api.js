// FeedView API integration (fetches posts from Azure Function)
export async function fetchPosts() {
  const res = await fetch('/api/feed');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function addPost(post) {
  const res = await fetch('/api/feed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to add post');
  return res.json();
}
