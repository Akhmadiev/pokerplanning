import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            actives: Array(10).fill(false)
        };
    }

    handeClick(i) {
        var currentActives = this.state.actives;
        currentActives.fill(false);
        currentActives[i] = true;

        this.setState({ actives: currentActives });
    }

    renderSquare(i) {
      return (
        <button key={i} type="button" className="btn btn-secondary board-el" onClick={() => this.handeClick(i)} style={{backgroundColor: this.state.actives[i] ? "black" : ""}}>
            {this.props.numbers[i]}
        </button>
      );
    }
  
    render() {
      let rows = [];
      for (let i = 0; i < this.props.numbers.length; i++){
        rows.push(this.renderSquare(i));
      }

      return (
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <div className="board-square">{rows}</div>
            </div>
      </div>
      );
    }
  }

  export default Board;