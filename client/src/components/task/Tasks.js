import React, { useContext } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Task';
import DataContext from '../../contexts/DataContext';

const Tasks = () => {
  const { data } = useContext(DataContext);
  const rows = [];
      
  for (let i = 0; i < data.tasks?.length; i++) {
    rows.push(<Task
      key={i}
      task={data.tasks[i]}
      voteTaskId={data.voteTaskId}
      created={true}
    />);
  }

  return (
    <div className="right">
      <div className="tasks-total">
        <div style={{ position: "fixed" }}><h4>Total:<span className="badge badge-secondary" style={{ color: "black", right: 0 }}>{data.voteTotal ?? 0}</span></h4></div>
        <div className="tasks">
          {rows}
          <Task />
        </div>
      </div>
    </div>
  );
}

export default Tasks;