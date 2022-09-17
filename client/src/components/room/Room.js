import React, { useContext } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { QueryService } from '../../services/QueryService';
import { useQuery } from 'react-query';
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
    socket.emit("join_room", { roomId: id, user: userData });
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

    useEffect(() => {
        socket.on("refetch", () => {
            roomData.refetch();
        });
        // eslint-disable-next-line
    }, [socket]);

    if (roomData.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }

    return (
        <div>
            <Users />
            <Tasks />
            <Votes />
        </div>
    )
}

export default Room;