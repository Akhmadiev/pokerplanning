import React, { useState, useContext } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import SocketContext from '../../contexts/SocketContext';

const Task = (props) => {
    const { socket } = useContext(SocketContext);
    const task = props.task;
    const { data, setData } = useContext(DataContext);
    const [newTask, setNewTask] = useState({});
    const location = useLocation();
    const fromPage = location.pathname || '/';
    const createTask = useMutation(async () => { return await QueryService.createTask(fromPage.replace('/', ''), newTask) }, {
        onSuccess: (response) => {
            setData(response.data);
            setNewTask({ value: "", vote: 0, votes: Array(0) });
            socket.emit("refetch", data.id);
        }
    });
    const deleteTask = useMutation(async (taskId) => { return await QueryService.deleteTask(fromPage.replace('/', ''), taskId); }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });
    const voteTask = useMutation(async (taskId) => { return await QueryService.voteTask(fromPage.replace('/', ''), taskId); }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });

    const isLoading = createTask.isLoading || deleteTask.isLoading || voteTask.isLoading;
    
    const onChange = (evt) => {
        var value = evt.target.value;
        setNewTask({ value: value, vote: 0, votes: Array(0) });
    }

    // const onVoteChange = (evt) => {
    //     var value = evt.target.value;
    //     QueryService.changeTaskVote(fromPage.replace('/', ''), props.voteTaskId, value);
    // }

    return (
        <div>
            {props.created ?
                (
                    <div className="input-group mb-3" style={{ width: "100%" }}>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="est"
                            aria-label="JIRA"
                            aria-describedby="basic-addon2"
                            value={props.task.vote}
                            disabled
                            // onChange={(evt) => onVoteChange(evt)}
                            style={{ maxWidth: "7%" }} />
                        <a style={{ width: "68%", textAlign: "center", border: "thick double #32a1ce", backgroundColor: props.voteTaskId === task.id ? "#90EE90" : "" }} href={task?.value}>{task?.value}</a>
                        <button
                            disabled={isLoading}
                            onClick={() => voteTask.mutate(props.task.id)}
                            style={{ width: "10%", backgroundColor: "#90EE90" }}
                            className="btn btn-outline-secondary"
                            type="button">
                            Vote
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={() => deleteTask.mutate(props.task.id)}
                            style={{ width: "15%", backgroundColor: "#FFCCCB" }}
                            className="btn btn-outline-secondary"
                            type="button">
                            Delete
                        </button>
                    </div>
                ) :
                (
                    <div>
                        <div className="input-group mb-3">
                            <input
                                disabled={isLoading}
                                type="text"
                                className="form-control"
                                placeholder="JIRA"
                                aria-label="JIRA"
                                aria-describedby="basic-addon2"
                                value={newTask.value}
                                onChange={(evt) => onChange(evt)}
                            />
                            <div className="input-group-append">
                                <button
                                    disabled={isLoading}
                                    onClick={(evt) => createTask.mutate()}
                                    style={{ backgroundColor: "#90EE90" }}
                                    className="btn btn-outline-secondary"
                                    type="button">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Task;