import React, { useState, useContext } from 'react';
import '../../css/Task.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from '../../services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import SocketContext from '../../contexts/SocketContext';
import Cookies from 'universal-cookie';

const Task = (props) => {
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    const userId = userData.id;
    const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    const { socket } = useContext(SocketContext);
    const task = props.task;
    const { data, setData } = useContext(DataContext);
    const [taskValue, setTaskValue] = useState("");
    const [description, setDescription] = useState("");
    const location = useLocation();
    const fromPage = location.pathname || '/';
    const roomId = fromPage.replaceAll('/', '').replaceAll('admin', '');
    const isAdmin = data.admin === userId || fromPage.includes('admin');
    const createTask = useMutation(async () => { return await QueryService.createTask(roomId, taskValue, description) }, {
        onSuccess: (response) => {
            setData(response.data);
            setTaskValue("");
            setDescription("");
            socket.emit("refetch", data.id);
        }
    });
    const deleteTask = useMutation(async (taskId) => { return await QueryService.deleteTask(roomId, taskId); }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });
    const voteTask = useMutation(async (taskId) => { return await QueryService.voteTask(roomId, taskId); }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });
    const voteChange = useMutation(async (data) => {
        return await QueryService.revealCards(roomId, data.taskId, data.vote);
    }, {
        onSuccess: (response) => {
            setData(response.data);
            socket.emit("refetch", data.id);
        }
    });

    const isLoading = createTask.isLoading || deleteTask.isLoading || voteTask.isLoading;
    
    const onChange = (evt) => {
        var value = evt.target.value;
        setTaskValue(value);
    }

    const onDescriptionChange = (evt) => {
        var value = evt.target.value;
        setDescription(value);
    }

    const onVoteChange = (evt, taskId) => {
        var currentVote = data.tasks.filter(x => x.id === taskId)[0].vote;
        var vote = getNextVote(currentVote, Number(evt.target.value));
        var voteData = {
            vote: Number(vote),
            taskId: taskId
        };
        voteChange.mutate(voteData);
    }

    const getNextVote = (prevVote, vote) => {
        var maxVote = 89;
        var minVote = 1;
        if (vote > maxVote) {
            return minVote;
        }

        if (vote < minVote) {
            return maxVote;
        }

        let index = fibonacci_numbers.indexOf(prevVote);
        return vote > prevVote ? fibonacci_numbers[index + 1] : fibonacci_numbers[index - 1];
    }

    return (
        <div>
            {props.created ?
                (
                    <div>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={task?.description} placeholder="Description" disabled aria-label="Description" rows="2" />
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control task-vote-input"
                                disabled={isLoading || !isAdmin}
                                aria-label="JIRA"
                                value={task?.vote}
                                pattern='[0-5]'
                                checked
                                aria-describedby="basic-addon2"
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                 }}
                                onChange={(evt) => onVoteChange(evt, props.task.id)}/>
                            <a
                                className='task-vote-href'
                                style={{backgroundColor: props.voteTaskId === task.id ? "#90EE90" : "" }}
                                href={task?.value} target="_blank">
                                {task?.value}
                            </a>
                            <button
                                disabled={isLoading || !isAdmin}
                                onClick={() => voteTask.mutate(props.task.id)}
                                className="btn btn-outline-secondary task-vote-btn"
                                type="button">
                                Vote
                            </button>
                            <button
                                disabled={isLoading || !isAdmin}
                                onClick={() => deleteTask.mutate(props.task.id)}
                                className="btn btn-outline-secondary task-delete-btn"
                                type="button">
                                Delete
                            </button>
                        </div>
                    </div>
                ) :
                (
                    <div hidden={!isAdmin}>
                        <textarea
                            onChange={(evt) => onDescriptionChange(evt)}
                            disabled={isLoading || !isAdmin}
                            className="form-control" id="exampleFormControlTextarea1"
                            value={description}
                            placeholder="Description"
                            aria-label="Description"
                            rows="2" />
                        <div className="input-group mb-3">
                            <input
                                disabled={isLoading || !isAdmin}
                                type="text"
                                className="form-control"
                                placeholder="JIRA link"
                                aria-label="JIRA link"
                                aria-describedby="basic-addon2"
                                value={taskValue}
                                onChange={(evt) => onChange(evt)}
                            />
                            <div className="input-group-append">
                                <button
                                    disabled={isLoading || !isAdmin}
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