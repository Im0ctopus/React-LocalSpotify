import { useState } from "react";

function Music() {
    const [music, setMusic] = useState(
        [
            {
                id: 0,
                name: 'Flawlëss (feat. Lil Uzi Vert)',
                img: '/Musics/Flawlëss (feat. Lil Uzi Vert).jfif',
                sound: '/Musics/Flawlëss (feat. Lil Uzi Vert).mp3'
            },
            {
                name: 'Porsche Turbo',
                img: '/Musics/Porsche Turbo.jfif',
                sound: '/Musics/Porsche Turbo.mp3'
            },
            {
                id: 1,
                name: 'Tá OK',
                img: '/Musics/Tá OK.jfif',
                sound: '/Musics/Tá OK.mp3'
            },
            {
                id: 2,
                name: 'Monëy so big',
                img: '/Musics/Monëy so big.jfif',
                sound: '/Musics/Monëy so big.mp3'
            },
            {
                id: 3,
                name: 'Joga Essa Rabeta',
                img: '/Musics/Joga Essa Rabeta.jfif',
                sound: '/Musics/Joga Essa Rabeta.mp3'
            },
            {
                id: 4,
                name: 'Rock',
                img: '/Musics/Rock.jfif',
                sound: '/Musics/Rock.mp3'
            },
        ]
    )
}

export default Music;