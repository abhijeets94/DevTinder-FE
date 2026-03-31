import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Profile } from "./components/Profile.tsx";
import { Login } from "./components/Login.tsx";
import { Feed } from "./components/Feed.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Feed/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
