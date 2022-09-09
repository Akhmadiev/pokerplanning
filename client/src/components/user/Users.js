import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import { useContext } from 'react';
import SocketContext from '../../contexts/SocketContext';

const Users = () => {
  const { socket } = useContext(SocketContext);
  const { data, setData } = useContext(DataContext);
  const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const votesSum = Array(89 + 1).fill(0);
  const location = useLocation();
  const fromPage = location.pathname || '/';
  const users = data.users;
  const votes = data.tasks?.filter(x => x.id === data.voteTaskId)[0]?.votes;
  const reveal = useMutation(async () => {
    var votingTask = data.tasks.filter(x => x.id === data.voteTaskId)[0];
    votingTask.votes.forEach(x => {
      votesSum[x.vote]++;
    });
    var voteSum = votesSum.indexOf(Math.max(...votesSum));
    const revealResult = await QueryService.revealCards(fromPage.replace('/', ''), data.voteTaskId, voteSum);
    socket.emit("refetch", data.id);

    return revealResult;
  }, {
    onSuccess: (response) => {
      setData(response.data);
    }
  });

  const deleteUser = useMutation(async (userId) => { return await QueryService.deleteUser(fromPage.replace('/', ''), userId); }, {
    onSuccess: (response) => {
      setData(response.data);
      socket.emit("refetch", response.data.id);
    }
  });

  var rows = [];
  for (let i = 0; i < users?.length; i++) {
    const player = users[i];
    const vote = votes?.filter(x => x.userId === player.id)[0]?.vote;

    rows.push(<div className="player-component" key={i}>
      {/* <button
        onClick={() => deleteUser.mutate(player.id)}
        style={{ width: "50%", marginLeft: "25%", backgroundColor: "#FFCCCB" }}
        className="btn btn-outline-secondary player-delete"
        type="button">
        X
      </button> */}
      <div className="player-card" style={{ background: vote > 0 ? "content-box radial-gradient(lightgreen, blue)" : "content-box radial-gradient(lightgreen, skyblue)" }}><span style={{ visibility: data.reveal ? "visible" : "hidden" }}>{vote}</span></div>
      <div className="player-name">{player.name}</div>
    </div>);
  }

  return (
    <div>
      <div className="users">
        {rows}
      </div>
      <button disabled={!data.voteTaskId || reveal.isLoading} type="button" className="btn btn-primary btn-lg player-reveal" onClick={() => reveal.mutate()}>Reveal</button>
    </div>
  );
}

export default Users;