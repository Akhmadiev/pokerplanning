import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { QueryService } from '../../services/QueryService';
import { useQuery } from 'react-query';
import Users from '../user/Users';
import Votes from '../vote/Votes';
import Tasks from '../task/Tasks';

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
            <Users room={data.data} />
            <Tasks tasks={tasks} voteTaskId={voteTaskId} />
            <Votes tasks={tasks} voteTaskId={voteTaskId} />
        </div>
    )
}

export default Room;