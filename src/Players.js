import React from 'react';
import Player from './Player';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './Board';


class Players extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  handeClick() {
    this.setState({ visible: !this.state.visible });
}
    render() {
        return (
          <div>
            <Board
              playersDisabled={this.props.playersDisabled}
              onPlayerSelect={(value) => this.props.onPlayerSelect(value)}
              numbers={this.props.numbers}/>
            <div className="players">
              <Player
                value={this.props.value} name="Marat" visible={this.state.visible}/>
            </div>
            <button onClick={() => this.handeClick()} type="button" className="btn btn-primary btn-lg player-reveal" disabled={this.props.playersDisabled || this.state.revealDisabled}>Reveal</button>
          </div>
        );
        }
}

export default Players;