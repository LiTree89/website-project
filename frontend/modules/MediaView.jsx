import React, { useState } from 'react';

export default function MediaView() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  function handleUpload(e) {
    setError(null);
    const files = Array.from(e.target.files);
    const valid = files.filter(f => f.type.startsWith('image/'));
    if (valid.length !== files.length) {
      setError('Only image files are supported for now.');
    }
    valid.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setImages(imgs => [...imgs, { name: file.name, url: ev.target.result }]);
      reader.readAsDataURL(file);
    });
  }

  return (
    <div>
      <h2>Media</h2>
      <div style={{ background: '#222', padding: 16, borderRadius: 8, margin: '10px 0' }}>
        <div style={{ color: '#888', marginBottom: 12 }}>Share images with your friends!</div>
        <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ marginBottom: 12 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {images.map((img, i) => (
            <div key={i} style={{ background: '#181A20', borderRadius: 8, padding: 8, boxShadow: '0 2px 8px #0002' }}>
              <img src={img.url} alt={img.name} style={{ maxWidth: 180, maxHeight: 180, borderRadius: 6 }} />
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>{img.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
