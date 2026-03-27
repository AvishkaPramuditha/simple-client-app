import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Enroll from './pages/Enroll';
import Verify from './pages/Verify';
import Identify from './pages/Identify';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="enroll" element={<Enroll />} />
        <Route path="verify" element={<Verify />} />
        <Route path="identify" element={<Identify />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
