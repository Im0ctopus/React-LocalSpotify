import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlay, FaPause, FaRegTrashCan } from 'react-icons/fa6'
import { IoIosMore } from "react-icons/io";

import './Playlist.css'


function Playlist(params) {
    const navigate = useNavigate();
    let { id } = useParams();
    function handlePlay(Index) {
        params.setCurrentPlaylist(id);
        params.setId(Index);
    }
    function handleRemove(Index) {
        var temp = [...params.playLists];
        console.log(temp[id].musics);
        temp[id].musics = temp[id].musics.filter(m => m.id != Index);
        params.setPlayLists(temp);
    }
    function handlePlDelete() {
        var temp = [...params.playLists];
        temp.splice(id, 1);
        console.log(temp);
        params.setPlayLists(temp);
        navigate(`/`)
    }
    return (
        <main className="playlist">
            <div className="playlist_header_bk"></div>
            <div className="playlist_header">
                {params.playLists[id].musics[0] ? <img className="playlist_header_img" src={params.playLists[id].musics[0].img} alt="" /> : <></>}
                <div className="playlist_header_info">
                    <p className="playlist">Playlist</p>
                    <p className="title">{params.playLists[id].name}</p>
                </div>
            </div>
            <div className="playlist_body">
                <div className="playlist_body_header">
                    <button className="play" onClick={() => params.setCurrentPlaylist(id)}><FaPlay size={'25px'} style={{ marginLeft: '3px' }} /></button>
                    <button className="more" onClick={handlePlDelete} ><FaRegTrashCan size={'20px'} /></button>
                </div>
                <div className="playlist_body_list">
                    <div className="playlist_body_list_header">
                        <p>#</p>
                        <p>Title</p>
                    </div>
                    <hr />
                    {params.playLists[id].musics ? params.playLists[id].musics.map((music, Index) => (
                        <div className="music" draggable key={Index}>
                            <div className="music_index">
                                <p>{Index + 1}</p>
                                <FaPlay className="play_icon" onClick={() => handlePlay(Index)} />
                            </div>
                            <img className="music_img" src={music.img} alt="" />
                            <div className="music_info">
                                <p className="title">{music.name}</p>
                                <p className="artist">{music.artist}</p>
                            </div>
                            <FaRegTrashCan className="trash_icon" onClick={() => handleRemove(music.id)} />
                        </div>
                    )) : <></>}
                </div>
            </div>
        </main>
    );
}

export default Playlist;