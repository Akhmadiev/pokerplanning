import React, { useContext } from 'react';
import '../../css/Room.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { QueryService } from '../../services/QueryService';
import { useMutation, useQuery } from 'react-query';
import Users from '../user/Users';
import Votes from '../vote/Votes';
import Tasks from '../task/Tasks';
import DataContext from '../../contexts/DataContext';
import Cookies from 'universal-cookie';
import SocketContext from '../../contexts/SocketContext';
import { useEffect } from 'react';

const Room = () => {
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    const { setData } = useContext(DataContext);
    const { id } = useParams();
    const { socket } = useContext(SocketContext);
    socket.emit("join_room", { roomId: id, userId: userData.id });
    const roomData = useQuery(['room'], async () => {
        const creaetUserResult = await QueryService.createUser(id, userData);
        if (creaetUserResult) {
            socket.emit("refetch", id);
        }

        return await QueryService.getRoom(id);
    }, {
        onSuccess: (response) => {
            setData(response.data);
        }
    });
    const deleteUser = useMutation(async (userId) => { return await QueryService.deleteUser(id, userId); }, {
        onSuccess: (response) => {
          setData(response.data);
          socket.emit("refetch", response.data.id);
        }
      });

    useEffect(() => {
        socket.on("refetch", () => {
            roomData.refetch();
        });
        socket.on("userDisconnect", (userId) => {
            deleteUser.mutate(userId);
        });
        // eslint-disable-next-line
    }, [socket]);

    if (roomData.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }

    return (
        <div className='room'>
            <div className='room-left'>
                <Users />
                <Votes />
            </div>
            <div className='room-right'>
                <Tasks />
            </div>            
        </div>
    )
}

export default Room;