import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import Feed from "../Feed/Feed";
import Juice from "../Juice/Juice";
import userService from "../../utils/userService";
import Featured from "../Featured/Featured"

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
    
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }
  
  console.log(user, ' this user')
  if(user) {
    return (
    <Routes>
      <Route
        path="/random"
        element={<Featured user={user} handleLogout={handleLogout} />}
        />
      <Route
        path="/juice"
        element={<Juice user={user} handleLogout={handleLogout} />}
        />
      <Route
        path="/"
        element={<Feed user={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout}  />} />
    </Routes>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
