import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SupportIcon from "@mui/icons-material/VolunteerActivism";
import UserProfile from "./modules/UserProfile";
import FeedView from "./modules/FeedView";
import ChatView from "./modules/ChatView";
import ChatAgent from "./modules/ChatAgent";
import MediaView from "./modules/MediaView";
import GooglePayButton from "./modules/GooglePayButton.jsx";

const NAV = [
  { key: "feed", label: "Feed", icon: "📰" },
  { key: "profile", label: "Profile", icon: "👤" },
  { key: "chat", label: "Chat", icon: "💬" },
  { key: "agent", label: "Agent", icon: "🤖" },
  { key: "media", label: "Media", icon: "🎬" },
];

export default function App() {
  const [route, setRoute] = useState("feed");
  const [showSupport, setShowSupport] = useState(false);

  function renderRoute() {
    if (route === "profile") return <UserProfile />;
    if (route === "chat") return <ChatView />;
    if (route === "agent") return <ChatAgent />;
    if (route === "media") return <MediaView />;
    // Feed/dashboard with support banner
    return (
      <>
        <div
          style={{
            background: "linear-gradient(90deg,#3A8DFF 0%,#8ecfff 100%)",
            color: "#181A20",
            borderRadius: 12,
            padding: 24,
            marginBottom: 28,
            boxShadow: "0 2px 16px #0003",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
              Welcome to LiTree Social!
            </div>
            <div style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
              The next-gen social platform. Support us to unlock premium
              features and keep the vibes going!
            </div>
            <button
              onClick={() => setShowSupport(true)}
              style={{
                background: "#181A20",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 22px",
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Support / Subscribe 💸
            </button>
          </div>
          <img
            src="/avatars/dripgod.png"
            alt="avatar"
            style={{
              width: 80,
              borderRadius: "50%",
              boxShadow: "0 2px 8px #0004",
            }}
          />
        </div>
        <FeedView />
      </>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Roboto, Arial, sans-serif",
        background: "#181A20",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar with Material UI */}
      <AppBar position="static" sx={{ background: "#23272F", boxShadow: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            LiTree Social
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {NAV.map((n) => (
              <Button
                key={n.key}
                onClick={() => setRoute(n.key)}
                variant={route === n.key ? "contained" : "text"}
                sx={{
                  background: route === n.key ? "#3A3F4B" : "transparent",
                  color: "#fff",
                  fontWeight: route === n.key ? 700 : 400,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.2,
                  fontSize: 18,
                  textTransform: "none",
                  '&:hover': { background: "#3A8DFF", color: "#fff" },
                }}
                startIcon={<span>{n.icon}</span>}
              >
                {n.label}
              </Button>
            ))}
            <Button
              onClick={() => setShowSupport(true)}
              variant="contained"
              color="primary"
              sx={{
                background: "#3A8DFF",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                px: 2.5,
                py: 1.2,
                fontSize: 18,
                ml: 2,
                textTransform: "none",
                boxShadow: 1,
              }}
              startIcon={<SupportIcon />}
            >
              Support
            </Button>
          </Box>
          <Typography variant="body1" sx={{ color: "#aaa", ml: 3 }}>
            Welcome, Drip God
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 32,
        }}
      >
        <div style={{ width: "100%", maxWidth: 700 }}>{renderRoute()}</div>
      </div>
      {/* Support Modal */}
      {showSupport && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#000a",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#23272F",
              borderRadius: 16,
              padding: 36,
              minWidth: 340,
              boxShadow: "0 4px 32px #0008",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowSupport(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>
              Support LiTree Social
            </div>
            <div style={{ color: "#aaa", marginBottom: 18 }}>
              Your support helps us build the future of social. Tip or subscribe
              below!
            </div>
            <GooglePayButton
              price="5.00"
              label="Subscribe $5/mo"
              onSuccess={() => alert("Thank you for subscribing! (Demo)")}
            />
            <GooglePayButton
              price="1.00"
              label="Tip $1"
              onSuccess={() => alert("Thanks for your tip! (Demo)")}
            />
            <div style={{ color: "#888", fontSize: 13, marginTop: 18 }}>
              Google Pay demo – connect your real merchant account for live
              payments.
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer
        style={{
          background: "#23272F",
          color: "#888",
          textAlign: "center",
          padding: 16,
          fontSize: 14,
        }}
      >
        &copy; {new Date().getFullYear()} LiTree Social. All rights reserved.
      </footer>
    </div>
  );
}
