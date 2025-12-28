// User System Module (Starter)
// Handles user profiles, authentication, friends/follow, and settings

export default {
  name: "user",
  init(app) {
    // Register user routes, state, and UI
    app.registerRoute("/profile", () => import("./UserProfile.js"));
    // ...more user logic
  },
};
