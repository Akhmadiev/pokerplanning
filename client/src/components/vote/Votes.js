import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import SocketContext from '../../contexts/SocketContext';
import '../../css/Votes.css';

const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

const Votes = () => {
    const { socket } = useContext(SocketContext);
    const { data, setData } = useContext(DataContext);
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    const userId = userData.id;
    const location = useLocation();
    const fromPage = location.pathname || '/';
    const roomId = fromPage.replaceAll('/', '').replaceAll('admin', '');
    const votesSum = Array(89 + 1).fill(0);
    const isAdmin = data.admin === userId || fromPage.includes('admin');
    const userVoteTask = useMutation(async (vote) => { return await QueryService.userVoteTask(roomId, data.voteTaskId, userId, vote) }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });
    const reveal = useMutation(async () => {
        var votingTask = data.tasks.filter(x => x.id === data.voteTaskId)[0];
        votingTask.votes.forEach(x => {
            votesSum[x.vote]++;
        });
        var voteSum = votesSum.indexOf(Math.max(...votesSum));
        const revealResult = await QueryService.revealCards(roomId, data.voteTaskId, voteSum);
        socket.emit("refetch", data.id);
    
        return revealResult;
    }, {
        onSuccess: (response) => {
            setData(response.data);
        }
    });
    const vote = data.tasks?.filter(x => x.id === data.voteTaskId)[0]?.votes.filter(x => x.userId === userId)[0]?.vote;
    
    const renderSquare = (i) => {
        return (
            <button
                disabled={userVoteTask.isLoading || !data.voteTaskId}
                key={i} type="button"
                className="votes-vote"
                onClick={() => userVoteTask.mutate(fibonacci_numbers[i])}
                style={{ backgroundColor: vote === fibonacci_numbers[i] ? "rgb(30, 48, 146)" : "rgb(65, 152, 252)" }}
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
        <div className='votes'>
            <button
                disabled={!data.voteTaskId || reveal.isLoading || !isAdmin}
                type="button"
                className='votes-reveal'
                onClick={() => reveal.mutate()}>
                Reveal
            </button>
            <div role="toolbar" aria-label="Toolbar with button groups">
                <div role="group" aria-label="First group">
                    <div>{rows}</div>
                </div>
            </div>
        </div>
    );
}

export default Votes;