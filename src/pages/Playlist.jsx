import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlay, FaRegTrashCan } from 'react-icons/fa6'

import './Playlist.css'
import './NotFound.css'


function Playlist(params) {
    const draggedIndex = useRef();
    const dragToIndex = useRef();
    const navigate = useNavigate();
    let { id } = useParams();
    function handlePlay(Index) {
        if (!params.playLists[id].musics[0]) alert("This Playlist has no Musics");
        else {
            params.setCurrentPlaylist(id);
            params.setId(Index);
        }
    }
    function handleRemove(Index) {
        var temp = [...params.playLists];
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
    function handleDragEnter(index) {
        dragToIndex.current = index;
    }

    function handleDragStart(index) {
        draggedIndex.current = index;
    }
    function handleDrop() {
        const temp = [...params.playLists];
        const musics = temp[id].musics;
        const draggedItem = musics[draggedIndex.current]
        musics.splice(draggedIndex.current, 1);
        musics.splice(dragToIndex.current, 0, draggedItem);
        temp[id].musics = musics;
        params.setPlayLists(temp);
    }
    return (
        <>
            {params.playLists[id] && id != 0 ? <main className="playlist">
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
                        {params.playLists[id].musics[0] ? <button className="play" onClick={() => handlePlay(0)}><FaPlay size={'25px'} style={{ marginLeft: '3px' }} /></button> : <></>}
                        <button className="more" onClick={handlePlDelete} ><FaRegTrashCan size={'20px'} /></button>
                    </div>
                    <div className="playlist_body_list">
                        <div className="playlist_body_list_header">
                            <p>#</p>
                            <p>Title</p>
                        </div>
                        <hr />
                        {params.playLists[id].musics ? params.playLists[id].musics.map((music, Index) => (
                            <div onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => handleDragEnter(Index)} onDragStart={(e) => handleDragStart(Index)} onDragEnd={handleDrop} className="music" draggable='true' key={Index}>
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
            </main> : <div className="notfound">
                <img src="\Logo.png" alt="" />
                <p className="title">Page not Found</p>
                <p className="subtitle">We can’t seem to find the page you are looking for.</p>
                <button onClick={() => navigate('/')}>Home</button>
            </div>}
        </>

    );
}

export default Playlist;