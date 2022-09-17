import React, { useContext } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import NewRoom from './NewRoom';
import DataContext from '../../contexts/DataContext';

const Rooms = () => {
  const { setData } = useContext(DataContext);
  const { data, isLoading } = useQuery(['rooms'], () => QueryService.getRooms(), {
    onSuccess: () => {
      setData({});
    }
  });
  
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
    </div>);
  }

  return (
    <div>
      <NewRoom />
      <h3 style={{ left: "2%", top: "20%", position: "fixed", fontStyle: "italic" }}>Rooms:</h3>
      <div className="rooms">
        {rows}
      </div>
    </div>
  );
}

export default Rooms;