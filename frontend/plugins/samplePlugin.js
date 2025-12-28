// Sample Plugin (Starter)
// Example of a plugin that adds a custom widget or feature

export default {
  name: "samplePlugin",
  init(app) {
    // Register a custom widget or route
    app.registerWidget("SampleWidget", () => import("./SampleWidget.js"));
    // ...more plugin logic
  },
};
