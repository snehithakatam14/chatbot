#importing libraries
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Home from './Home.jsx';
import History from './History.jsx';
import Login from './Login.jsx';
import RPT from './RPT.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register.jsx';
import Logout from './Logout.jsx';
import Profile from './Profile.jsx';



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='rpt' element={<RPT />} />
          <Route path="history" element={<History />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Home/>}/>        
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
