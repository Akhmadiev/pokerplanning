import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from './Services/QueryService';
import { useQuery } from 'react-query';
import Room from './Room';
import { useNavigate } from 'react-router-dom';
import NewRoom from './NewRoom';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useQuery(['rooms'], () => QueryService.getRooms());
  
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  const rooms = data.data;
  const rows = [];

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    rows.push(<div>
      {new Date(room.createDate).toLocaleDateString()}
      {' - '}
      <Link key={room.id} to={`/${room.id}`}>{room.name}</Link>
    </div>);
  }

  return (
    <div>
      <NewRoom />
      <h3 style={{ marginLeft: "2%" }}>Rooms:</h3>
      <div className="rooms">
        {rows}
      </div>
    </div>
  );
}

export default Rooms;