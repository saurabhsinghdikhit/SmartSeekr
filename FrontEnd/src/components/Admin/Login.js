import React, { useState, useEffect } from 'react';
import { useAdminContext } from './AdminContext';
import { useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const { isAdminAuthenticated, setIsAdminAuthenticated } = useAdminContext();
    const [reloadHtmlPortion, setReloadHtmlPortion] = useState(false);

    let navigate = useNavigate()

    useEffect(() => {

        if (isAdminAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [isAdminAuthenticated, navigate]);
    console.log(isAdminAuthenticated);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            Email: username,
            Password: password
        };

        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + 'User/LoginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const responseData = await response.json();

            if (!response.isError && response.ok) {

                console.log("Successfully logged in");
                if (responseData.result.userTypeValue == "Admin") {
                    setIsAdminAuthenticated(true);
                    navigate("/admin/dashboard");
                }

            } else {
                if (responseData.errors) {
                    setFieldErrors(responseData.errors);
                }
                setErrorMessage(responseData.stateModel.errorMessage || 'An error occurred during login.');
                console.log('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />

            <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css" />

            <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css" />

            <link rel="stylesheet" href="dist/css/adminlte.min.css"></link>

            <div className="login-page">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <a className="h1">
                                <b>SmartSeekr Admin</b>
                            </a>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                {fieldErrors.Email && <p className="text-danger">{fieldErrors.Email[0]}</p>}
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                {fieldErrors.Password && <p className="text-danger">{fieldErrors.Password[0]}</p>}

                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                </div>

                                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login;