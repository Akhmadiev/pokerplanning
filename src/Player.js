import React from 'react';
import './App.css';

const Player = (props) => {
    return (
        <div className="player-component">
            <div className="player-card"><div><span>{props.value}</span></div></div>
            <div className="player-name">{props.name}</div>
        </div>
    );
}

export default Player;