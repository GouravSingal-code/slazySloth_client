import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Bottombar from "./Components/Bottombar/Bottombar";
import SearchContent from "./Components/SearchContent/SearchContent";
import Assignment from "./Components/Assignment/Assignment";
import ProfilePage from "./Components/Profile/Profile";
import Login from "./Components/Authorization/Login/Login";
import Register from "./Components/Authorization/Register/Register";
import SetPassword from "./Components/Authorization/Password/SetPassword";
import Article from "./Components/Article/Article"


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  }


  return (
    <div>
    {isLoggedIn ? (
      <Router>
      <div
      >
        <Navbar onLogout={handleLogout} />
        <div>
            <Routes>
              <Route exact path="/" element={<SearchContent />} />
              <Route path="/assignment" element={<Assignment />} />
              <Route path="/dashboard" element={<ProfilePage />} />
              <Route path="/create" element={<Article />} />
            </Routes>
        </div>
        <Bottombar style={{marginTop:"100vh"}} />
      </div>
    </Router>
    ) : (
      <div>
      <Router>
      <Routes>
          <Route exact path="/" element={ <Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin}/>} />
          <Route path="/setPassword" element={<SetPassword/>} />
      </Routes>
      </Router>
      </div>
    )}
    </div>
  );
}

export default App;
