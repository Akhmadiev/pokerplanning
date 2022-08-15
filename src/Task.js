import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryService } from './Services/QueryService';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Task = (props) => {
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    const [taskData, setTaskData] = useState({});
    const location = useLocation();
    const fromPage = location.pathname || '/';
    const createTask = useMutation(async () => { await QueryService.createTask(fromPage.replace('/', ''), taskData) }, {
        onSuccess: () => { 
            setTaskData({ value: "", vote: 0, votes: Array(0) });
        }
    });
    const deleteTask = useMutation(async (taskId) => { await QueryService.deleteTask(fromPage.replace('/', ''), taskId) });
    const voteTask = useMutation(async (taskId) => { return await QueryService.voteTask(fromPage.replace('/', ''), taskId) }, {
        onSuccess: (data) => {
        }
    });
    const task = props.task;
    
    const onChange = (evt) => {
        var value = evt.target.value;
        setTaskData({ value: value, vote: 0, votes: Array(0) });
    }

    // const onVoteChange = (evt) => {
    //     var value = evt.target.value;
    //     QueryService.changeTaskVote(fromPage.replace('/', ''), props.voteTaskId, value);
    // }

    return (
        <div>
            {props.created ?
                (
                    <div className="input-group mb-3" style={{width:"100%"}}>
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
                                    onClick={() => voteTask.mutate(props.task.id)}
                                    style={{ width:"10%", backgroundColor: "#90EE90" }}
                                    className="btn btn-outline-secondary"
                                    type="button">
                                    Vote
                        </button>
                        <button
                            onClick={() => deleteTask.mutate(props.task.id)}
                                    style={{ width:"15%", backgroundColor: "#FFCCCB" }}
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
                                type="text"
                                className="form-control"
                                placeholder="JIRA"
                                aria-label="JIRA"
                                aria-describedby="basic-addon2"
                                value={taskData.value}
                                onChange={(evt) => onChange(evt)}
                            />
                            <div className="input-group-append">
                                <button
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