import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Search.css'
import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";
import { FaPlay } from 'react-icons/fa6'
import { IoIosMore } from "react-icons/io";





function Search(params) {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(-1);
    let { search } = useParams();
    const [searchParams, setSearchParams] = useState(search ? search : "");
    useEffect(() => {
        navigate(`/search/${searchParams}`)
    }, [searchParams]);
    const all = params.music;
    const musicResult = all.filter(music =>
        music.name.toLocaleLowerCase().includes(searchParams.toLocaleLowerCase())
    );
    function handlePlay(Index) {
        params.setCurrentPlaylist(0);
        params.setId(Index);
    }
    function handleSettings(Index) {
        if (settings == Index) {
            setSettings(-1)
        } else {
            setSettings(Index);
        }
    }
    function handleAdd(Index, Pindex) {
        var temp = [...params.playLists];
        temp[Pindex].musics = [...temp[Pindex].musics, all[Index]];
        params.setPlayLists(temp);
        handleSettings(-1);
    }
    return (
        <main className="search">
            <div className="search_input">
                <input onChange={(e) => setSearchParams(e.target.value)} value={searchParams} type="text" placeholder="Get your music here" />
                <GoSearch className="icon" />
                <IoMdClose onClick={(e) => setSearchParams("")} className={`cicon ${searchParams ? "show" : ""}`} />
            </div>
            <div className="search_result">
                {searchParams ? musicResult.map((music, Index) => (
                    <div className={`${settings == Index ? 'selected' : ''} music`} key={Index}>
                        <FaPlay className="play_icon" onClick={() => handlePlay(music.id)} />
                        <img className="music_img" src={music.img} alt="" />
                        <div className="music_info">
                            <p className="title">{music.name}</p>
                            <p className="artist">{music.artist}</p>
                        </div>
                        <IoIosMore className="more_icon" onClick={() => handleSettings(Index)} />
                        <div className={`${settings == Index ? 'show' : ''} add`}>
                            {params.playLists.map((playlist, Pindex) => (
                                Pindex === 0 ? null : <div onClick={() => handleAdd(music.id, Pindex)} className={`add_playlist`} key={Pindex}>{playlist.name}</div>
                            ))}
                        </div>
                    </div>
                )) : <></>}
            </div>
        </main >
    );
}

export default Search;