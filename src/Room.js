import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { QueryService } from './Services/QueryService';
import { useQuery } from 'react-query';
import Players from './Players';
import Tasks from './Tasks';

const Room = (props) => {
    const { id } = useParams();
    const { data, error, isError, isLoading } = useQuery(['room'], () => QueryService.getRoom(id));
    
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const players = data.data.players;
    const tasks = data.data.tasks;
    
    return (
        <div>
            <Players players={players} />
            <Tasks tasks={tasks} />
        </div>
    )
}

export default Room;