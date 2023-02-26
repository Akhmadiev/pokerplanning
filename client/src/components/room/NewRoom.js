import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QueryService } from '../../services/QueryService';
import '../../css/NewRoom.css';
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
            <div className="input-group mb-3 new-room">
                <input
                    onChange={(evt) => onChange(evt)}
                    type="text"
                    className="form-control new-room-input"
                    placeholder="Name"
                    aria-label="Name"
                    maxLength={50}
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => mutate()}
                        className="btn btn-outline-secondary new-room-btn"
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