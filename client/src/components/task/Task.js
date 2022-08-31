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
            setNewTask({ value: "", vote: 0, votes: Array(0), description: "" });
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
        setNewTask({ value: value, vote: 0, votes: Array(0), description: newTask.description });
    }

    const onDescriptionChange = (evt) => {
        var value = evt.target.value;
        newTask.description = value;
        setNewTask(newTask);
    }

    return (
        <div>
            {props.created ?
                (
                    <div className="task">
                        <textarea class="form-control" id="exampleFormControlTextarea1" value={task?.description} placeholder="Description" disabled aria-label="Description" rows="2" />
                        <div className="input-group mb-3" style={{ width: "100%" }}>
                            <input
                                type="number"
                                className="form-control"
                                aria-label="JIRA"
                                disabled
                                value={task?.vote}
                                aria-describedby="basic-addon2"
                                // onChange={(evt) => voteChange.mutate(props.task.id, evt.target.value)}
                                style={{ maxWidth: "9%" }} />
                            <a style={{ width: "66%", textAlign: "center", border: "thick double #32a1ce", backgroundColor: props.voteTaskId === task.id ? "#90EE90" : "" }} href={task?.value}>{task?.value}</a>
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
                    </div>
                ) :
                (
                    <div>
                        <textarea onChange={(evt) => onDescriptionChange(evt)} class="form-control" id="exampleFormControlTextarea1" value={newTask?.description} placeholder="Description" aria-label="Description" rows="2" />
                        <div className="input-group mb-3">
                            <input
                                disabled={isLoading}
                                type="text"
                                className="form-control"
                                placeholder="JIRA link"
                                aria-label="JIRA link"
                                aria-describedby="basic-addon2"
                                value={newTask?.value}
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