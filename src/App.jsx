import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Index from './pages/Index';
import Player from './components/Player';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Player />
    </Router>
  )
}

export default App
