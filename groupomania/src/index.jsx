import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import AuthPage from "./pages/auth/Auth";
import Home from "./pages/home/Home";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<React.StrictMode>
    <Router>
      <Routes>
      <Route exact path="/">
        <AuthPage/>
      </Route>
      <Route exact path="/Home">
        <Home/>
      </Route>
      </Routes>
    </Router>
  </React.StrictMode>*/
  <React.StrictMode>
    <AuthPage/>
  </React.StrictMode>
);
