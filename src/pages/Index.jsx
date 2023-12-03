import React, { useMemo, useState } from "react";
import './Index.css'
import { Link } from "react-router-dom";
import { FaPlay } from 'react-icons/fa6'


function Index(params) {
    const [saud, setSaud] = useState("");
    useMemo(() => {
        const time = new Date();
        if (time.getHours() >= 5 && time.getHours() <= 12) setSaud("Morning");
        else if (time.getHours() >= 12 && time.getHours() <= 20) setSaud("Afternoon");
        else setSaud("Night");
    }, []);
    function handlePlay(Pindex, e) {
        e.preventDefault();
        if (!params.playLists[Pindex].musics[0]) alert("This Playlist has no Musics");
        else {
            params.setCurrentPlaylist(Pindex);
            params.setId(0);
        }
    }
    return (
        <main className="index">
            <div className="index_title">
                <p>Good {saud}</p>
            </div>
            <div className="index_playlists">
                {params.playLists.map((playlist, index) => (
                    index == 0 || index > 6 ? "" :
                        <Link to={`/playlist/${index}`} className="index_playlists_playlist" key={index}>
                            {playlist.musics[0] ?
                                <>
                                    <img className="img" src={playlist.musics[0].img} alt="" />
                                    <p className="name">{playlist.name}</p>
                                </>
                                : <p className="name">{playlist.name}</p>}
                            {params.playLists[index].musics[0] ? <button className="play" onClick={(e) => handlePlay(index, e)}><FaPlay size={'25px'} style={{ marginLeft: '3px' }} /></button> : <></>}
                        </Link>
                ))}
            </div>
            <div className="index_me">
                <p className="title">Made by:</p>
                <a href="https://github.com/Im0ctopus" target="_blank">github.com/Im0ctopus</a>
                <img src="\profile.webp" alt="" />
            </div>
        </main>
    );
}

export default Index;