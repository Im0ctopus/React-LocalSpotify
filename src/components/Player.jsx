import React, { useEffect, useMemo, useState } from "react";
import './Player.css'
import { FaBackwardStep, FaForwardStep, FaPlay } from 'react-icons/fa6'

function Player() {
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

    const [currentId, setCurrentId] = useState(0);
    const [currentMusic, setCurrentMusic] = useState(new Audio(music[currentId].sound));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusicDuration, setCurrentMusicDuration] = useState(0);
    const [currentMusicTime, setCurrentMusicTime] = useState(0);
    const [currentMusicPercent, setCurrentMusicPercent] = useState(0);
    const [volume, setVolume] = useState(1);

    useMemo(() => {
        currentMusic.preload = 'metadata';
    }, [currentMusic]);

    useEffect(() => {
        currentMusic.volume = volume;
        if (isPlaying) {
            currentMusic.play();
        }
    }, [currentMusic]);

    const timer = 500;
    useEffect(() => {
        const time = setInterval(() => {
            if (currentMusic.duration) setCurrentMusicDuration(currentMusic.duration);
            setCurrentMusicTime(currentMusic.currentTime);
            setCurrentMusicPercent((currentMusic.currentTime / currentMusic.duration) * 100);
            if (currentMusic.currentTime >= currentMusic.duration) {
                handleNext();
            }
        }, timer);
        return () => clearInterval(time);
    }, [isPlaying, currentMusic])

    useEffect(() => {
        setCurrentMusic(new Audio(music[currentId].sound));
    }, [currentId]);

    function handlePlay() {
        if (isPlaying) {
            setIsPlaying(false);
            currentMusic.pause();
        } else {
            setIsPlaying(true);
            currentMusic.play();
        }
    }

    function handleBack() {
        if (currentMusic.currentTime <= 3) {
            currentMusic.pause();
            if (currentId <= 0) {
                setCurrentId((music.length - 1))
            } else {
                setCurrentId(currentId - 1);
            }
        } else {
            currentMusic.currentTime = 0;
        }
    }

    function handleNext() {
        currentMusic.pause();
        if (currentId >= (music.length - 1)) {
            setCurrentId(0);
        } else {
            setCurrentId(currentId + 1);
        }
    }

    function handleChangeTime(value) {
        currentMusic.currentTime = ((value / 100) * currentMusic.duration)

    }

    function handleVolume(value) {
        setVolume(value);
        currentMusic.volume = value;
    }

    return (
        <main className="player">
            <div className="player_img"></div>
            <div className="player_name">
                <p className="player_name_music"></p>
                <p className="player_name_artist"></p>
            </div>
            <div className="player_controllers">
                <div className="player_controller_buttons">
                    <button onClick={handleBack}><FaBackwardStep /></button>
                    <button onClick={handlePlay}><FaPlay /></button>
                    <button onClick={handleNext}><FaForwardStep /></button>
                </div>
                <div className="player_controller_slider">
                    <p className="player_controller_slider_time">{parseInt(currentMusicTime / 60)}:{parseInt(currentMusicTime % 60) < 10 ? '0' + parseInt(currentMusicTime % 60) : parseInt(currentMusicTime % 60)}</p>
                    <div className="player_controller_slider_bar">
                        <div className="player_controller_slider_bar_total"></div>
                        <div className="player_controller_slider_bar_current" style={{ width: `${currentMusicPercent}%` }}></div>
                        <div className={`player_controller_slider_bar_ball`} style={{ marginLeft: `${currentMusicPercent - 1}%` }}></div>
                        <input step={0} type="range" onChange={(e) => handleChangeTime(e.target.value)} className="player_controller_slider_bar_input" value={currentMusicPercent} min={0} max={100} name="" id="" />
                    </div>
                    <p className="player_controller_slider_duration">{parseInt(currentMusicDuration / 60)}:{parseInt(currentMusicDuration % 60) < 10 ? '0' + parseInt(currentMusicDuration % 60) : parseInt(currentMusicDuration % 60)}</p>
                </div>
            </div>
            <div className="player_sound">
                <div className="player_sound_mute"></div>
                <div className="player_sound_bar">
                    <div className="player_controller_slider_bar_total"></div>
                    <div className="player_controller_slider_bar_current" style={{ width: `${(volume * 100)}%` }}></div>
                    <div className={`player_controller_slider_bar_ball`} style={{ marginLeft: `${(volume * 100 - 15)}%` }}></div>
                    <input type="range" onChange={(e) => handleVolume(e.target.value)} className="player_controller_slider_bar_input" step={0.01} value={volume} min={0} max={1} name="" id="" />
                </div>
            </div>
        </main >
    );
}

export default Player;