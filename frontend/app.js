// LiTbiT-2.0 App Loader (Starter)
// Loads core modules, plugins, and themes dynamically

const app = {
  modules: {},
  plugins: {},
  themes: {},
  registerRoute(path, loader) {
    // Register a route (placeholder)
    this.routes = this.routes || {};
    this.routes[path] = loader;
  },
  registerWidget(name, loader) {
    // Register a widget (placeholder)
    this.widgets = this.widgets || {};
    this.widgets[name] = loader;
  },
  loadModule(name, mod) {
    this.modules[name] = mod;
    if (mod.init) mod.init(this);
  },
  loadPlugin(name, plugin) {
    this.plugins[name] = plugin;
    if (plugin.init) plugin.init(this);
  },
  loadTheme(name, theme) {
    this.themes[name] = theme;
    // Apply theme logic here
  },
};

// Example: Load core modules
import userModule from "./modules/user.js";
import feedModule from "./modules/feed.js";
import chatModule from "./modules/chat.js";
import mediaModule from "./modules/media.js";

app.loadModule("user", userModule);
app.loadModule("feed", feedModule);
app.loadModule("chat", chatModule);
app.loadModule("media", mediaModule);

// Example: Load a plugin
import samplePlugin from "./plugins/samplePlugin.js";
app.loadPlugin("samplePlugin", samplePlugin);

// Example: Load a theme
import defaultTheme from "./themes/defaultTheme.js";
app.loadTheme("defaultTheme", defaultTheme);

export default app;
