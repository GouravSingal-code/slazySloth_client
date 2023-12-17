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
import './App.css';


function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Retrieve authentication status from localStorage on component mount
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // Update localStorage when isAuthenticated changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <div>
    {isAuthenticated ? (
      <Router>
      <div
          className="app-container"
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
        {/*<Bottombar className="bottomBar"/>*/}
      </div>
    </Router>
    ) : (
      <div>
      <Router>
      <Routes>
          <Route exact path="/" element={ <Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleLogin={handleLogin} />} />
          <Route path="/setPassword" element={<SetPassword/>} />
      </Routes>
      </Router>
      </div>
    )}
    </div>
  );
}

export default App;
