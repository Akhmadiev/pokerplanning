import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QueryService } from '../../services/QueryService';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewRoom = () => {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState('');
    const { mutate } = useMutation(async () => {
        await QueryService.createRoom(roomData);
    }, {
        onSuccess: () => {
            navigate(`/${roomData.id}`);
        }
    });

    const onChange = (evt) => {
        var value = evt.target.value;
        setRoomData({ name: value, voteTaskId: null });
    }

    return (
        <div>
            <div className="input-group mb-3" style={{ position: "fixed", top: "10%", width: "30%", left: "2%" }}>
                <input
                    onChange={(evt) => onChange(evt)}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    aria-label="Name"
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => mutate({ name: "test" })}
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