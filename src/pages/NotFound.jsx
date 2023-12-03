import React from "react";
import './NotFound.css'
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="notfound">
            <img src="\Logo.png" alt="" />
            <p className="title">Page not Found</p>
            <p className="subtitle">We can’t seem to find the page you are looking for.</p>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default NotFound;