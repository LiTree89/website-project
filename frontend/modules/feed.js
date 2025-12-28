// Social Feed Module (Starter)
// Handles posts, comments, likes, and feed logic

export default {
  name: "feed",
  init(app) {
    // Register feed routes, state, and UI
    app.registerRoute("/feed", () => import("./FeedView.js"));
    // ...more feed logic
  },
};
