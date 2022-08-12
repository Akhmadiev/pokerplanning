import React from 'react';
import Players from './Players';
import Tasks from './Tasks';
import { usePlayers } from './Hooks/usePlayers';
import { useMutation } from 'react-query'
import { QueryService } from './Services/QueryService';

const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

function GetData(props) {
  const comp = props.component;
  const { data, isLoading } = usePlayers();
  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>
        <Players
          players={data.data}
          playersDisabled={comp.state.playersDisabled}
          numbers={fibonacci_numbers}
          onPlayerSelect={(value) => comp.handeOnPlayerSelect(value)} />
        <Tasks
          tasks={comp.state.tasks}
          numbers={fibonacci_numbers}
          onVoteSelect={(i) => comp.handleOnVoteSelect(i)}
          onTaskDelete={(i) => comp.handleOnTaskDelete(i)}
          onUpdateVoteValue={(evt, i) => comp.hanldeOnUpdateVoteValue(evt, i)}
          onTaskAdd={(value) => comp.handleOnTaskAdd(value)} />
  </div>
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: "Marat",
      playerName: this.props.player,
      tasks: Array(0),
      playersDisabled: true
    };
  }

  handleOnTaskDelete = (i) => {
    var tasks = this.state.tasks;
    tasks = tasks.filter((value, index) => index !== i);
    this.setState({ tasks: tasks });
  };

  handleOnTaskAdd = (value) => {
    var tasks = this.state.tasks;

    if (tasks.map(x => x.value).includes(value) || !value) {
      return;
    }

    tasks.push({ value: value, selected: false, vote: 0 });
    this.setState({ tasks: tasks });
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

    this.setState({ tasks: tasks, playersDisabled: !selected });
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
    debugger;
    // const { isLoading, mutateAsync } = useMutation(
    //   'create country',
    //   (data) => CountryService.create(data),
    //   {
    //     onSuccess: () => {
    //       push('/')
    //     },
    //     onError: (error) => {
    //       alert(error.message)
    //     },
    //   }
    // )
  
    // handleSubmit = async (e) => {
    //   e.preventDefault()
    //   await mutateAsync(data)
    // }

    return (
      <GetData component={this} />
    );
  }
}

export default App;