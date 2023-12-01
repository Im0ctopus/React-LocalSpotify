import React from "react";
import './Sidebar.css';
import { GoHome, GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";

function SideBar(params) {
    const playlists = params.playLists;
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <Link to='/' className="icon">
                    <GoHome color="white" size={'30px'} />
                </Link>
                <Link to='/search' className="icon">
                    <GoSearch color="white" size={'30px'} />
                </Link>
            </div>
            <div className="sidebar_bottom">
                {playlists.map((playlist, Index) => (
                    <Link to={`/playlist/${Index}`} className="sidebar_bottom_playlist" key={Index}>
                        <img className="sidebar_bottom_playlist_img" src={playlist.musics[0].img} alt="" />
                    </Link>
                ))}
            </div>
        </div >
    );
}

export default SideBar;