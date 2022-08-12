import React, { useState } from 'react';
import './App.css';
import { useMutation } from 'react-query';
import { QueryService } from './Services/QueryService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';

const CreatePlayer = () => {
    const [playerData, setPlayerData] = useState('');
    const { isLoading, isError, error, mutate } = useMutation(async () => { await QueryService.createPlayer(1, playerData) },
        {
            onSuccess: (data) => {

            }
        });

    const onChange = (evt) => {
        var value = evt.target.value;
        setPlayerData({id: v4(), name: value});
    }

    return (
        <div>
            <div className="input-group mb-3" style={{ width: "20%", left: "40%", top: "40%" }}>
                <input
                    onChange={(evt) => onChange(evt)}
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => mutate({name: "test"})}
                        className="btn btn-outline-secondary"
                        type="button"
                        style={{ backgroundColor: "#90EE90" }}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePlayer;