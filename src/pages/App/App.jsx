import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import Feed from "../Feed/Feed";
import Juice from "../Juice/Juice";
import userService from "../../utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());
  // const [posts, setPosts] = useState([]); 

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
    
  }

  // async function getPosts() {
  //   try {
  //     const data = await postsAPI.getAll();
  //     console.log(data, " this is data,");
  //     setPosts([...data.posts]);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err.message, " this is the error");
  //     setError(err.message);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  function handleLogout() {
    userService.logout();
    setUser(null);
  }
  
  console.log(user, ' this user')
  if(user) {
    return (
    <Routes>
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
