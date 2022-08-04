import React from 'react';
import './App.css';

class Player extends React.Component {
    render() {
        return (
            <div className="player-component">
                <div className="player-card"><div style={{visibility:this.props.visible ? "" : "hidden"}}><span>{this.props.value}</span></div></div>
                <div className="player-name">{this.props.name}</div>
            </div>
        );
      }
}

export default Player;