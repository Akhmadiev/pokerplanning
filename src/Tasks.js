import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Task';

const Tasks = (props) => {
  const hanldeOnUpdateInputValue = (evt) => {
    var value = evt.target.value;
  }

  const totalVote = props.tasks.reduce((a, v) => a = a + v.vote, 0);
  const rows = [];
      
  for (let i = 0; i < props.tasks.length; i++) {
    rows.push(<Task
      task={props.tasks[i]}
      voteTaskId={props.voteTaskId}
      created={true}
    // selected={this.props.tasks[i].selected}
    // onVoteSelect={() => this.props.onVoteSelect(i)}
    // onVoteChange={(evt) => this.props.onUpdateVoteValue(evt, i)} key={i} delete={true}
    // onClick={() => this.props.onTaskDelete(i)}
    />);
  }

  return (
    <div className="right">
      <div className="tasks-total">
        <div style={{position: "fixed"}}><h1>Total:<span className="badge badge-secondary" style={{ color: "blue", right: 0 }}>{totalVote}</span></h1></div>
        <div className="tasks">
          {rows}
          <Task onChange={(evt) => this.hanldeOnUpdateInputValue(evt)} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;