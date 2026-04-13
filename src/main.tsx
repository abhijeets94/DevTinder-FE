import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Profile } from "./components/Profile.tsx";
import { Login } from "./components/Login.tsx";
import { Feed } from "./components/Feed.tsx";
import { appStore } from "./utils/appStore.ts";
import { Provider } from "react-redux";
import { Connections } from "./components/Connections.tsx";
import { Request } from "./components/Requests.tsx";
import { Chat } from "./components/Chat.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />
            <Route path="/chat/:toUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
