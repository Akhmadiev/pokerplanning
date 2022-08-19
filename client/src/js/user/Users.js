import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';

const Users = (props) => {
  const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const location = useLocation();
  const fromPage = location.pathname || '/';
  const room = props.room;
  const users = room.players;
  const votes = room.tasks.filter(x => x.id === room.voteTaskId)[0]?.votes;
  const reveal = useMutation(async () => {
    var voteSum = 0;
    var stop = false;
    room.tasks.forEach((x) => {
      if (x.id === room.voteTaskId) {
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

    await QueryService.revealCards(fromPage.replace('/', ''), room.voteTaskId, voteSum);
  });

  var rows = [];
  for (let i = 0; i < users.length; i++) {
    const player = users[i];
    const vote = votes?.filter(x => x.userId === player.id)[0]?.vote;

    rows.push(<div className="player-component">
      <div className="player-card" style={{ background: vote > 0 ? "content-box radial-gradient(lightgreen, blue)" : "content-box radial-gradient(lightgreen, skyblue)" }}><span style={{ visibility: room.reveal ? "visible" : "hidden" }}>{vote}</span></div>
      <div className="player-name">{player.name}</div>
    </div>);
  }

  return (
    <div>
      <div className="players">
        {rows}
      </div>
      <button type="button" className="btn btn-primary btn-lg player-reveal" onClick={() => reveal.mutate()}>Reveal</button>
    </div>
  );
}

export default Users;