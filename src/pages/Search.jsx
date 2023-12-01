import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Search.css'
import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";
import { FaPlay } from 'react-icons/fa6'




function Search(params) {
    const navigate = useNavigate();
    let { search } = useParams();
    const [searchParams, setSearchParams] = useState(search ? search : "");
    useEffect(() => {
        navigate(`/search/${searchParams}`)
    }, [searchParams]);
    const all = params.playLists[0].musics;
    const musicResult = all.filter(music =>
        music.name.toLocaleLowerCase().includes(searchParams.toLocaleLowerCase())
    );
    return (
        <main className="search">
            <div className="search_input">
                <input onChange={(e) => setSearchParams(e.target.value)} value={searchParams} type="text" placeholder="Get your music here" />
                <GoSearch className="icon" />
                <IoMdClose onClick={(e) => setSearchParams("")} className={`cicon ${searchParams ? "show" : ""}`} />
            </div>
            <div className="search_result">
                {searchParams ? musicResult.map((music, Index) => (
                    <div className="music" key={Index}>
                        <div className="music_index">
                            <p>{Index + 1}</p>
                            <FaPlay className="play_icon" onClick={() => handlePlay(Index)} />
                        </div>
                        <img className="music_img" src={music.img} alt="" />
                        <div className="music_info">
                            <p className="title">{music.name}</p>
                            <p className="artist">{music.artist}</p>
                        </div>
                    </div>
                )) : <></>}
            </div>
        </main >
    );
}

export default Search;