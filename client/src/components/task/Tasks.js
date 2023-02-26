import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Task';
import DataContext from '../../contexts/DataContext';
import '../../css/Tasks.css';

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
    <div>
      <div className="tasks-total"><h4>Total:<span>{data.voteTotal ?? 0}</span></h4></div>
      <div className="tasks">
        {rows}
        <Task />
      </div>
    </div>
  );
}

export default Tasks;