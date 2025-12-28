import React from 'react';
import GooglePayButton from './GooglePayButton.jsx';

export default function UserProfile() {
  return (
    <div>
      <h2>User Profile</h2>
      <div style={{ background: '#222', padding: 16, borderRadius: 8, margin: '10px 0' }}>
        <b>Drip God</b>
        <div style={{ marginTop: 8 }}>
          <img src="/avatars/dripgod.png" alt="avatar" style={{ width: 64, borderRadius: '50%' }} />
        </div>
        <div style={{ marginTop: 8 }}>90000x Vibes Only</div>
        <div style={{ marginTop: 8, color: '#888' }}>Settings and profile editing coming soon.</div>
        <GooglePayButton price="1.00" label="Tip Drip God $1" onSuccess={() => alert('Thanks for your tip! (Demo)')} />
      </div>
    </div>
  );
}
