import React, { useContext } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import SocketContext from '../../contexts/SocketContext';

const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

const Votes = () => {
    const { socket } = useContext(SocketContext);
    const { data, setData } = useContext(DataContext);
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    const userId = userData.id;
    const location = useLocation();
    const fromPage = location.pathname || '/';
    const userVoteTask = useMutation(async (vote) => { return await QueryService.userVoteTask(fromPage.replace('/', ''), data.voteTaskId, userId, vote) }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });
    const vote = data.tasks?.filter(x => x.id === data.voteTaskId)[0]?.votes.filter(x => x.userId === userId)[0]?.vote;
    
    const renderSquare = (i) => {
        return (
            <button
                disabled={userVoteTask.isLoading || !data.voteTaskId}
                key={i} type="button"
                className="btn btn-secondary board-el board-square-button"
                onClick={() => userVoteTask.mutate(fibonacci_numbers[i])}
                style={{ backgroundColor: vote === fibonacci_numbers[i] ? "black" : "" }}
            >
                {fibonacci_numbers[i]}
            </button>
        );
    }
  
    let rows = [];
    for (let i = 0; i < fibonacci_numbers.length; i++) {
        rows.push(renderSquare(i));
    }

    return (
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <div className="board-square">{rows}</div>
            </div>
        </div>
    );
}

export default Votes;