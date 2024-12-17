// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Product } from './pages/Product';
import Profile from './pages/Profile';
function App() {


  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route path="/login"
        element={<Login />} />
      <Route
        path='/products'
        element={<Product />} />
      <Route
        path='/profile'
        element={<Profile />}
      />
    </Routes>
  );
}

export default App;
