import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componenti
import Navigation from './components/Navigation';
import Home from './components/Home';
import Recommendations from './components/Recommendations';
import Preferences from './components/Preferences';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App netflix-bg">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;