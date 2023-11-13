import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "../pages/UserPage/UserPage";
import FriendsList from "../pages/FriendsPage/FriendList";
import Chat from "../pages/ChatPage/ChatPage";
import AuthForm from "../pages/AuthPage/AuthPage";
import { TokenContext } from "../App";

const AppRouter: React.FC = () => {
  const { token } = useContext(TokenContext);
  return (
    <div style={{ display: "flex" }}>
      <Routes>
        {token && (
          <>
            <Route path="info" element={<UserPage />} />
            <Route path="friends" element={<FriendsList />} />
            <Route path="messages/:id" element={<Chat />} />
          </>
        )}
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
