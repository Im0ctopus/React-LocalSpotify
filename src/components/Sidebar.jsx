import React from "react";
import './Sidebar.css';
import { GoHome, GoSearch } from "react-icons/go";

function SideBar(params) {
    const playlists = params.playLists;
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <a className="icon">
                    <GoHome color="white" size={'30px'} />
                </a>
                <a className="icon">
                    <GoSearch color="white" size={'30px'} />
                </a>
            </div>
            <div className="sidebar_bottom">
                {playlists.map((playlist, Index) => (
                    <div onClick={() => params.setCurrentPlaylist(Index)} className="sidebar_bottom_playlist" key={Index}>
                        <img className="sidebar_bottom_playlist_img" src={playlist.musics[0].img} alt="" />
                    </div>
                ))}
            </div>
        </div >
    );
}

export default SideBar;