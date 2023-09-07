import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import WelcomePage from './Welcome'; // Import your WelcomePage component

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

