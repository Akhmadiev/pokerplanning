import React, { useContext } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import NewRoom from './NewRoom';
import { useMutation } from 'react-query';
import DataContext from '../../contexts/DataContext';
import { useLocation } from 'react-router-dom';

const Rooms = () => {
  const { setData } = useContext(DataContext);
  const { data, isLoading } = useQuery(['rooms'], () => QueryService.getRooms(), {
    onSuccess: () => {
      setData({});
    }
  });

  const deleteRoom = useMutation(async (roomId) => { return await QueryService.deleteRoom(roomId); }, {
    onSuccess: () => {
      window.location.reload();
    }
  });
  const location = useLocation();
  const fromPage = location.pathname || '/';
  var isDelete = fromPage.replace('/', '') === 'delete';
  
  if (isLoading) {
    return <div className='container'><div className='loading'></div></div>
  }

  const rooms = data.data;
  const rows = [];

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    rows.push(<div key={i}>
      {new Date(room.createDate).toLocaleDateString()}
      {' - '}
      <Link to={`/${room.id}`}>{room.name}</Link>
      <button
          hidden={!isDelete}
          onClick={() => deleteRoom.mutate(room.id)}
          style={{ marginLeft: "1%", backgroundColor: "#FFCCCB" }}
          className="btn btn-outline-secondary"
          type="button">
          Delete
      </button>
    </div>);
  }

  return (
    <div>
      <NewRoom />
      <div className="rooms">
        {rows}
      </div>
    </div>
  );
}

export default Rooms;