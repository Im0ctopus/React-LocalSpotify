import React, { useRef, useState } from "react";
import './Sidebar.css';
import { GoHome, GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose } from "react-icons/io";

function SideBar(params) {
    const playlists = params.playLists;
    const [create, setCreate] = useState(false);
    const name = useRef();
    function handleCreate() {
        if (name.current.value == "") alert("Name can't be null"); else {
            const temp = [...params.playLists, { name: name.current.value, musics: [] }];
            name.current.value = "";
            params.setPlayLists(temp)
            setCreate(false);
        }
    }
    return (
        <>
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
                        Index == 0 ? <></> :
                            <Link to={`/playlist/${Index}`} className="sidebar_bottom_playlist" key={Index}>
                                {playlist.musics[0] ? <img className="sidebar_bottom_playlist_img" src={playlist.musics[0].img} alt="" /> : <p className="sidebar_bottom_playlist_name">
                                    {playlist.name}
                                </p>}

                            </Link>
                    ))}
                    <div onClick={() => setCreate(true)} className="sidebar_bottom_playlist">
                        <div className="sidebar_bottom_playlist_icon">
                            <IoMdAdd />
                        </div>
                    </div>
                </div>
            </div >
            <div className={`${create ? 'popupShow' : ''} create_background`}>
                <div className="create">
                    <div className="create_leave" onClick={() => setCreate(false)}><IoMdClose /></div>
                    <label>Playlist Name</label>
                    <input ref={name} type="text" />
                    <button onClick={handleCreate}>Create</button>
                </div>
            </div>
        </>
    );
}

export default SideBar;