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
  const location = useLocation();
  const fromPage = location.pathname || '/';
  const users = data.users;
  const votes = data.tasks?.filter(x => x.id === data.voteTaskId)[0]?.votes;
  const reveal = useMutation(async () => {
    var voteSum = 0;
    var stop = false;
    data.tasks.forEach((x) => {
      if (x.id === data.voteTaskId) {
        voteSum = x.votes.reduce((a, v) => a = a + v.vote, 0);
        voteSum = voteSum / x.votes.length;
        fibonacci_numbers.forEach((number, index) => {
          if (!stop && voteSum <= number) {
            if (index === 0) {
              voteSum = fibonacci_numbers[index];
            } else if (index === fibonacci_numbers.length - 1) {
              voteSum = fibonacci_numbers[fibonacci_numbers.length - 1];
            } else {
              const dif_a = voteSum - fibonacci_numbers[index];
              const dif_b = voteSum - fibonacci_numbers[index + 1];
              if (Math.abs(dif_b) < Math.abs(dif_a)) {
                voteSum = fibonacci_numbers[index + 1];
              } else {
                voteSum = fibonacci_numbers[index];
              }
            }
            stop = true;
          }
        });
      }
    });
    
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
      <button
        onClick={() => deleteUser.mutate(player.id)}
        style={{ width: "50%", marginLeft: "25%", backgroundColor: "#FFCCCB" }}
        className="btn btn-outline-secondary player-delete"
        type="button">
        X
      </button>
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