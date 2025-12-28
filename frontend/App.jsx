import React, { useState } from 'react';
import UserProfile from './modules/UserProfile';
import FeedView from './modules/FeedView';
import ChatView from './modules/ChatView';
import MediaView from './modules/MediaView';

const NAV = [
  { key: 'feed', label: 'Feed', icon: '📰' },
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'chat', label: 'Chat', icon: '💬' },
  { key: 'media', label: 'Media', icon: '🎬' },
];

export default function App() {
  const [route, setRoute] = useState('feed');

  function renderRoute() {
    switch (route) {
      case 'profile': return <UserProfile />;
      case 'chat': return <ChatView />;
      case 'media': return <MediaView />;
      default: return <FeedView />;
    }
  }

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif', background: '#181A20', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{ background: '#23272F', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px #0002' }}>
        <div style={{ fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>LiTree Social</div>
        <nav style={{ display: 'flex', gap: 24 }}>
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => setRoute(n.key)}
              style={{
                background: route === n.key ? '#3A3F4B' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '10px 18px',
                fontSize: 18,
                cursor: 'pointer',
                fontWeight: route === n.key ? 700 : 400,
                transition: 'background 0.2s',
              }}
            >
              <span style={{ marginRight: 8 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div style={{ fontSize: 16, color: '#aaa' }}>Welcome, Drip God</div>
      </header>
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 32 }}>
        <div style={{ width: '100%', maxWidth: 700 }}>
          {renderRoute()}
        </div>
      </div>
      {/* Footer */}
      <footer style={{ background: '#23272F', color: '#888', textAlign: 'center', padding: 16, fontSize: 14 }}>
        &copy; {new Date().getFullYear()} LiTree Social. All rights reserved.
      </footer>
    </div>
  );
}
