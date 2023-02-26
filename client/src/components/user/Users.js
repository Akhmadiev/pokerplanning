import React from 'react';
import '../../css/Users.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import { useContext } from 'react';
import SocketContext from '../../contexts/SocketContext';
import Cookies from 'universal-cookie';

const Users = () => {
  const cookies = new Cookies();
  const userData = cookies.get('PlanningAuth');
  const userId = userData.id;
  const { socket } = useContext(SocketContext);
  const { data, setData } = useContext(DataContext);
  const location = useLocation();
  const fromPage = location.pathname || '/';
  const roomId = fromPage.replaceAll('/', '').replaceAll('admin', '');
  const users = data.users;
  const votes = data.tasks?.filter(x => x.id === data.voteTaskId)[0]?.votes;

  const deleteUser = useMutation(async (userId) => { return await QueryService.deleteUser(roomId, userId); }, {
    onSuccess: (response) => {
      setData(response.data);
      socket.emit("refetch", response.data.id);
    }
  });

  var rows = [];
  for (let i = 0; i < users?.length; i++) {
    const player = users[i];
    const vote = votes?.filter(x => x.userId === player.id)[0]?.vote;

    rows.push(<div className="users-card" key={i}>
      {/* <button
        hidden={!isAdmin}
        onClick={() => deleteUser.mutate(player.id)}
        style={{ width: "50%", marginLeft: "25%", backgroundColor: "#FFCCCB" }}
        className="btn btn-outline-secondary player-delete"
        type="button">
        X
      </button> */}
      <div className="users-vote" style={{ background: vote > 0 ? "content-box radial-gradient(lightblue, blue)" : "content-box radial-gradient(lightblue, skyblue)" }}><span style={{ visibility: data.reveal ? "visible" : "hidden" }}>{vote}</span></div>
      <div className="users-name">{player.name}</div>
    </div>);
  }

  return (
    <div>
      <div className="users bg-light">
        {rows}
      </div>
    </div>
  );
}

export default Users;