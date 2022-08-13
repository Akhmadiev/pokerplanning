import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QueryService } from './Services/QueryService';
import { useMutation } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const { isLoading, isError, error, mutate } = useMutation(async () => { await QueryService.createUser(fromPage.replace('/', ''), userData) },
    {
        onSuccess: () => {
            const cookies = new Cookies();
            cookies.set('PlanningAuth', userData, { path: '/' });
            navigate(fromPage, { replace: true });
        }
    });

    const onChange = (evt) => {
        var value = evt.target.value;
        setUserData({name: value});
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
                        onClick={() => mutate()}
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

export default Login;
