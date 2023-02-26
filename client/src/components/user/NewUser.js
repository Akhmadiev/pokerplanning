import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';
import '../../App.css';

const NewUser = () => {
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';

    const onChange = (evt) => {
        var value = evt.target.value;
        setUserData({ name: value });
    }

    const onCreateUser = () => {
        const cookies = new Cookies();
        userData.id = v4();
        cookies.set('PlanningAuth', userData, { path: '/' });
        navigate(fromPage, { replace: true });
    }

    return (
        <div>
            <div className="loginBackground"></div>
            <div className="input-group mb-3" style={{width: "20vw", left: "40vw" }}>
                <input
                    onChange={(evt) => onChange(evt)}
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    maxLength={8}
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => onCreateUser()}
                        className="btn btn-outline-secondary"
                        type="button"
                        style={{ backgroundColor: "#90EE90", height: "100%" }}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewUser;
