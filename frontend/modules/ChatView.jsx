import React, { useState, useRef, useEffect } from 'react';

export default function ChatView() {
  const [messages, setMessages] = useState([
    { user: 'Drip God', text: 'Welcome to the chat!', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { user: 'Drip God', text: input, timestamp: Date.now() }]);
    setInput('');
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ background: '#222', padding: 16, borderRadius: 8, margin: '10px 0', maxHeight: 320, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b style={{ color: '#8ecfff' }}>{msg.user}</b> <span style={{ color: '#888', fontSize: 12 }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            <div style={{ marginLeft: 8 }}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #444', background: '#181A20', color: '#fff' }}
        />
        <button type="submit" style={{ background: '#3A8DFF', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px' }}>Send</button>
      </form>
    </div>
  );
}
