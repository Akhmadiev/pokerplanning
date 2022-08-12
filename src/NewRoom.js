import React, { useState } from 'react';
import './App.css';
import { useMutation } from 'react-query';
import { QueryService } from './Services/QueryService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const NewRoom = () => {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState('');
    const { isLoading, isError, error, mutate } = useMutation(async () => { await QueryService.createRoom(roomData) },
        {
            onSuccess: () => {
                navigate(`/${roomData.id}`);
            }
        });

    const onChange = (evt) => {
        var value = evt.target.value;
        setRoomData({name: value});
    }

    return (
        <div>
            <div className="input-group mb-3" style={{ width: "40%", marginTop: '2%', marginLeft: '2%' }}>
                <input
                    onChange={(evt) => onChange(evt)}
                    type="text"
                    className="form-control"
                    placeholder="Room name"
                    aria-label="Room name"
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => mutate({name: "test"})}
                        className="btn btn-outline-secondary"
                        type="button"
                        style={{ backgroundColor: "#90EE90" }}>
                        Create a new room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewRoom;