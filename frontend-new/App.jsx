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
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
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
    </Router>
  );
}
