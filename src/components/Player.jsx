import React, { useEffect, useMemo, useState } from "react";
import './Player.css'
import { FaBackwardStep, FaForwardStep, FaPlay, FaVolumeHigh, FaVolumeLow, FaVolumeXmark, FaPause } from 'react-icons/fa6'

function Player(musicRec) {
    const music = musicRec.music;

    const [currentId, setCurrentId] = useState(0);
    const [currentMusic, setCurrentMusic] = useState(new Audio(music[0].sound));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusicDuration, setCurrentMusicDuration] = useState(0);
    const [currentMusicTime, setCurrentMusicTime] = useState(0);
    const [currentMusicPercent, setCurrentMusicPercent] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [mute, setMute] = useState(false);

    useMemo(() => {
        console.log(currentId);
        setCurrentId(0);
        currentMusic.pause();
        setCurrentMusic(new Audio(music[0].sound));
    }, [music]);

    useEffect(() => {
        currentMusic.volume = volume;
        if (isPlaying) {
            currentMusic.play();
        }
    }, [currentMusic]);

    const timer = 100;
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

    function handleIdChange(value) {
        setCurrentMusic(new Audio(music[value].sound));
    }

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
                handleIdChange(music.length - 1);
            } else {
                setCurrentId(currentId - 1);
                handleIdChange(currentId - 1);
            }
        } else {
            currentMusic.currentTime = 0;
        }
    }

    function handleNext() {
        currentMusic.pause();
        if (currentId >= (music.length - 1)) {
            setCurrentId(0);
            handleIdChange(0);
        } else {
            setCurrentId(currentId + 1);
            handleIdChange(currentId + 1);
        }
    }

    function handleChangeTime(value) {
        currentMusic.currentTime = ((value / 100) * currentMusic.duration)

    }

    function handleVolume(value) {
        setMute(false)
        setVolume(value);
        currentMusic.volume = value;
    }

    function handleMute() {
        if (currentMusic.volume <= 0) {
            setMute(false)
            currentMusic.volume = volume;
        } else {
            setMute(true)
            currentMusic.volume = 0;
        }
    }

    function Info() {
        return (
            <>
                <div className="player_img">
                    <img src={music[currentId].img} alt="" />
                </div>
                <div className="player_name">
                    <p className="player_name_music">{music[currentId].name}</p>
                    <p className="player_name_artist">{music[currentId].artist}</p>
                </div>
            </>
        )
    }

    return (
        <main className="player">
            <Info></Info>
            <div className="player_controllers">
                <div className="player_controller_buttons">
                    <a onClick={handleBack} className="player_controller_buttons_controller"><FaBackwardStep size={'20px'} /></a>
                    <a onClick={handlePlay} className="player_controller_buttons_play">{isPlaying ? <FaPause color="black" style={{ marginLeft: '1px' }} size={'20px'} /> : <FaPlay color="black" style={{ marginLeft: '3px' }} size={'20px'} />}</a>
                    <a onClick={handleNext} className="player_controller_buttons_controller"><FaForwardStep size={'20px'} /></a>
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
                <div className="player_sound_mute" onClick={handleMute}>
                    {mute ? <FaVolumeXmark size={'15px'} /> : volume >= 0.5 ? <FaVolumeHigh size={'15px'} /> : <FaVolumeLow size={'15px'} />}
                </div>
                <div className="player_sound_bar">
                    <div className="player_controller_slider_bar_total" style={{ marginTop: '-3px' }}></div>
                    <div className="player_controller_slider_bar_current" style={{ marginTop: '-3px', width: `${mute ? 0 : (volume * 100)}%` }}></div>
                    <div className={`player_controller_slider_bar_ball `} style={{ marginTop: '-3px', marginLeft: `${mute ? 0 : (volume * 100 - 5)}%` }}></div>
                    <input type="range" onChange={(e) => handleVolume(e.target.value)} className="player_controller_slider_bar_input" step={0.01} value={volume} min={0} max={1} name="" id="" />
                </div>
            </div>
        </main >
    );
}

export default Player;