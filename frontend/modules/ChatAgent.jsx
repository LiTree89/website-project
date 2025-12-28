import React, { useState } from 'react';

export default function ChatAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(msgs => [...msgs, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { role: 'agent', content: data.reply || data.error }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'agent', content: 'Error: ' + err.message }]);
    }
    setInput('');
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
      <h3>Agent Chat</h3>
      <div style={{ minHeight: 120, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '6px 0' }}>
            <span style={{ fontWeight: m.role === 'user' ? 'bold' : 'normal' }}>
              {m.role === 'user' ? 'You' : 'Agent'}:
            </span> {m.content}
          </div>
        ))}
        {loading && <div>Agent is typing...</div>}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
}
