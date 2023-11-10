import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Index from './pages/Index';
import Player from './components/Player';

function App() {

  const [music, setMusic] = useState(
    [
      {
        id: 0,
        name: 'Flawlëss (feat. Lil Uzi Vert)',
        artist: 'Yeat',
        img: '/Musics/Flawlëss (feat. Lil Uzi Vert).jfif',
        sound: '/Musics/Flawlëss (feat. Lil Uzi Vert).mp3'
      },
      {
        id: 5,
        name: 'Porsche Turbo',
        artist: 'Lon3r Johny',
        img: '/Musics/Porsche Turbo.jfif',
        sound: '/Musics/Porsche Turbo.mp3'
      },
      {
        id: 1,
        name: 'Tá OK',
        artist: 'DENNIS',
        img: '/Musics/Tá OK.jfif',
        sound: '/Musics/Tá OK.mp3'
      },
      {
        id: 2,
        name: 'Monëy so big',
        artist: 'Yeat',
        img: '/Musics/Monëy so big.jfif',
        sound: '/Musics/Monëy so big.mp3'
      },
      {
        id: 3,
        name: 'Joga Essa Rabeta',
        artist: 'MC Teuzin',
        img: '/Musics/Joga Essa Rabeta.jfif',
        sound: '/Musics/Joga Essa Rabeta.mp3'
      },
      {
        id: 4,
        name: 'Rock',
        artist: 'Lon3r Johny',
        img: '/Musics/Rock.jfif',
        sound: '/Musics/Rock.mp3'
      },
    ]
  )

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Player music={music} />
    </Router>
  )
}

export default App
