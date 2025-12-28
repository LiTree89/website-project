// Media Sharing Module (Starter)
// Handles image, video, and audio sharing

export default {
  name: 'media',
  init(app) {
    // Register media routes, state, and UI
    app.registerRoute('/media', () => import('./MediaView.js'));
    // ...more media logic
  }
};
