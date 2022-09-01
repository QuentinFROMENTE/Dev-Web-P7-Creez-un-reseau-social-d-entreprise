import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import AuthPage from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Quote from "./pages/quote/Quote"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
      <Routes>
      <Route exact path="/" element={<AuthPage/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Quote" element={<Quote/>}/>
      </Routes>
    </Router>

);
