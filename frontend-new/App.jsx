import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./src/components/Sidebar.jsx";
import FeedPage from "./src/pages/FeedPage.jsx";
import ProfilePage from "./src/pages/ProfilePage.jsx";
import ChatPage from "./src/pages/ChatPage.jsx";
import AgentPage from "./src/pages/AgentPage.jsx";
import MediaPage from "./src/pages/MediaPage.jsx";
import PaymentDemo from "./src/components/PaymentDemo.jsx";

export default function App() {
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Hero Gradient Background */}
        <div className="fixed inset-0 z-0 bg-gradient-hero bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70" />
          {/* Optional: Add grainy overlay for premium feel */}
          <div className="absolute inset-0 bg-grainy pointer-events-none mix-blend-soft-light opacity-80" />
        </div>
        <div className="relative flex min-h-screen z-10">
          <Sidebar />
          <main className="flex-1 ml-20">
            <Routes>
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/agent" element={<AgentPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/pay" element={<PaymentDemo />} />
              <Route path="*" element={<Navigate to="/feed" replace />} />
            </Routes>
          </main>
        </div>
      </div>
export default function App() {
  return (
    <Router>
      <div
        className="relative min-h-screen bg-gradient-hero bg-cover bg-center dark:bg-gradient-hero2 text-white transition-colors duration-500"
        style={{ minHeight: '100vh' }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 pointer-events-none z-0" />
        <DarkModeToggle />
        <div className="relative flex min-h-screen z-10">
          <Sidebar />
          <main className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl mx-auto glassmorphic-card rounded-glass shadow-glass bg-glass/80 dark:bg-glassDark/80 backdrop-blur-glass border border-white/10 p-8">
              <NeonDivider />
              <Routes>
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/agent" element={<AgentPage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/pay" element={<PaymentDemo />} />
                <Route path="*" element={<Navigate to="/feed" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
