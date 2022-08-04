import React from 'react';
import Players from './Players';
import Tasks from './Tasks';

const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

class App extends React.Component {
constructor(props){
    super(props);

    var players = [{name: this.props.player, vote: 0}];

    this.state = {
        admin: "Marat",
        playerName: this.props.player,
        tasks: Array(0),
        players: players,
        playersDisabled: true
    };
}

handleOnTaskDelete = (i) => {
    var tasks = this.state.tasks;
    tasks = tasks.filter((value, index) => index !== i);
    this.setState({tasks:tasks});
};

handleOnTaskAdd = (value) => {
    var tasks = this.state.tasks;

    if (tasks.map(x => x.value).includes(value) || !value){
      return;
    }

    tasks.push({value: value, selected: false, vote: 0});
    this.setState({tasks: tasks});
  };

  hanldeOnUpdateVoteValue(evt, i) {
    var value = Number(evt.target.value);
    var tasks = this.state.tasks;
    tasks[i].vote = value;
    
    var sum = tasks.map(x => x.vote).reduce((s, a) => s + a, 0);

    this.setState({
        tasks: tasks,
        total: sum
    });
  }

  handleOnVoteSelect(i) {
    var tasks = this.state.tasks;
    var selected = !tasks[i].selected;

    tasks.forEach(x => x.selected = false);
    tasks[i].selected = selected;

    this.setState({tasks: tasks, playersDisabled: !selected});
  }

  handeOnPlayerSelect(value) {
    var players = this.state.players;
    var player = players.filter(x => x.name === this.state.playerName)[0];
    var playerIndex = players.indexOf(player);
    players[playerIndex] = value;

    this.setState({
        players: players
    });
  }

    render() {
        return (
          <div>
              <Players
                playersDisabled={this.state.playersDisabled}
                numbers={fibonacci_numbers}
                onPlayerSelect={(value) => this.handeOnPlayerSelect(value)}/>
              <Tasks
                tasks={this.state.tasks}
                numbers={fibonacci_numbers}
                onVoteSelect={(i) => this.handleOnVoteSelect(i)}
                onTaskDelete={(i) => this.handleOnTaskDelete(i)}
                onUpdateVoteValue={(evt, i) => this.hanldeOnUpdateVoteValue(evt, i)}
                onTaskAdd={(value) => this.handleOnTaskAdd(value)}/>
          </div>
        );
      }
}

export default App;