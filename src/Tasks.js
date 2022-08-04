import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Task';

class Tasks extends React.Component {
constructor(props){
    super(props);
    this.state = {
        tasks: Array(0),
        votes: Array(0),
        inputValue: "",
        total: 0
    };
}

handleOnDelete = (i) => {
  var tasks = this.state.tasks;
  tasks = tasks.filter((value, index) => index !== i);
  this.setState({tasks:tasks});
};

handleOnAdd = (value) => {
  if (this.state.tasks.map(x => x.value).includes(value) || !value){
    console.log("Значение " + value + " уже был добавлен или пустое");
    return;
  }
  var votes = this.state.votes;
  votes.push(0);
  this.state.tasks.push({value: value, vote: false});
  this.setState({tasks: this.state.tasks, inputValue: "", votes: votes});
};

hanldeOnUpdateInputValue(evt) {
  var value = evt.target.value;
  this.setState({
    inputValue: value
  });
}

hanldeOnUpdateVoteValue(evt, i) {
  var value = Number(evt.target.value);
  var votes = this.state.votes;
  votes[i] = value;
  var sum = votes.reduce((partialSum, a) => partialSum + a, 0);

  this.setState({
    votes: votes,
    total: sum
  });
}

handleOnVote(i) {
  var tasks = this.state.tasks;
  tasks.forEach(x => x.vote = false);
  tasks[i].vote = true;
  this.setState({tasks: tasks});
}

    render() {
        let rows = [];
      for (let i = 0; i < this.state.tasks.length; i++){
        rows.push(<Task 
          vote={this.state.tasks[i].vote}
          onVote={() => this.handleOnVote(i)}
          onVoteChange={(evt) => this.hanldeOnUpdateVoteValue(evt, i)} key={i} delete={true} 
          inputValue={this.state.tasks[i].value} 
          onClick={() => this.props.onTaskClick(i)}/>);
      }

        return (
              <div className="tasks">
                <h1>Total:<span className="badge badge-secondary" style={{color: "blue", right: 0}}>{this.state.total}</span></h1>
                {rows}
                <Task inputValue={this.state.inputValue} onChange={(evt) => this.hanldeOnUpdateInputValue(evt)} onClick={() => this.handleOnAdd(this.state.inputValue)}/>
            </div>
        );
      }
}

export default Tasks;