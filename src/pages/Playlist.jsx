import React from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaPause } from 'react-icons/fa6'
import { IoIosMore } from "react-icons/io";

import './Playlist.css'


function Playlist(params) {
    let { id } = useParams();
    return (
        <main className="playlist">
            <div className="playlist_header">
                <img className="playlist_header_img" src={params.playLists[id].musics[0].img} alt="" />
                <div className="playlist_header_info">
                    <p className="playlist">Playlist</p>
                    <p className="title">{params.playLists[id].name}</p>
                </div>
            </div>
            <div className="playlist_body">
                <div className="playlist_body_header">
                    <button className="play" onClick={() => params.setCurrentPlaylist(id)}><FaPlay size={'25px'} style={{ marginLeft: '3px' }} /></button>
                    <button className="more" ><IoIosMore size={'30px'} /></button>
                </div>
                <div className="playlist_body_list">
                    {params.playLists[id].musics.map((music, Index) => (
                        <div className="music" key={Index}>
                            {music.name}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Playlist;