import React from 'react';
import './App.css';

const Player = (props) => {
    return (
        <div className="player-component">
            <div className="player-card"><span style={{ visibility: "visible" }}>{props.vote}</span></div>
            <div className="player-name">{props.player.name}</div>
        </div>
    );
}

export default Player;