import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Task';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      total: 0
    };
  }

  hanldeOnUpdateInputValue(evt) {
    var value = evt.target.value;
  
    this.setState({
      inputValue: value
    });
  }

  render() {
    var rows = [];
      
    for (let i = 0; i < this.props.tasks.length; i++) {
      rows.push(<Task
        selected={this.props.tasks[i].selected}
        onVoteSelect={() => this.props.onVoteSelect(i)}
        onVoteChange={(evt) => this.props.onUpdateVoteValue(evt, i)} key={i} delete={true}
        onClick={() => this.props.onTaskDelete(i)}
        inputValue={this.props.tasks[i].value} />);
    }

    return (
      <div className="tasks">
        <h1>Total:<span className="badge badge-secondary" style={{ color: "blue", right: 0 }}>{this.state.total}</span></h1>
        {rows}
        <Task onChange={(evt) => this.hanldeOnUpdateInputValue(evt)} onClick={() => this.props.onTaskAdd(this.state.inputValue)} />
      </div>
    );
  }
}

export default Tasks;