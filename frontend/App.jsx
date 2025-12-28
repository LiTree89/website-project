import React, { useState } from 'react';
import UserProfile from './modules/UserProfile';
import FeedView from './modules/FeedView';
import ChatView from './modules/ChatView';
import MediaView from './modules/MediaView';

const routes = {
  '/profile': <UserProfile />,
  '/feed': <FeedView />,
  '/chat': <ChatView />,
  '/media': <MediaView />,
};

export default function App() {
  const [route, setRoute] = useState('/feed');

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif', background: '#181A20', color: '#fff', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', gap: 20, padding: 20 }}>
        <button onClick={() => setRoute('/feed')}>Feed</button>
        <button onClick={() => setRoute('/profile')}>Profile</button>
        <button onClick={() => setRoute('/chat')}>Chat</button>
        <button onClick={() => setRoute('/media')}>Media</button>
      </nav>
      <main style={{ padding: 20 }}>
        {routes[route]}
      </main>
    </div>
  );
}
