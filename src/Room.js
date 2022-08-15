import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { QueryService } from './Services/QueryService';
import { useQuery } from 'react-query';
import Players from './Players';
import Tasks from './Tasks';
import Votes from './Votes';

const Room = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery(['room'], () => QueryService.getRoom(id));
    
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const tasks = data.data.tasks;
    const voteTaskId = data.data.voteTaskId;
    
    return (
        <div>
            <Players room={data.data} />
            <Tasks tasks={tasks} voteTaskId={voteTaskId} />
            <Votes tasks={tasks} voteTaskId={voteTaskId} />
        </div>
    )
}

export default Room;