import { Link } from "react-router-dom";
import { React, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserAuthentication from "../../api/auth"
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
export default function LoginForm({ updateUserProfileData }) {
    let navigate = useNavigate()
    const [userModel, setUserModel] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    async function formSubmit(e) {
        e.preventDefault();
        const err = {};
        let valid = true;
        if (userModel.email == "") {
            err.email = "Enter email address";
            valid = false;
        }
        if (userModel.email != "" && !validEmailRegex.test(userModel.email)) {
            err.email = "Enter valid email";
            valid = false;
        }
        if (userModel.password.length < 8) {
            err.password = "Password must be at least 8 characters long!"
            valid = false;
        }
        setErrors(err);
        if (valid) {
            const usr = await UserAuthentication.loginUser(userModel);
            if (usr) {
                const user = { ...usr };
                if (usr.userTypeValue == "Applicant" || usr.userTypeValue == "Admin")
                    user.name = usr.employee.firstName;
                else
                    user.name = usr.employer.companyName;
                updateUserProfileData(user);
                toast("Login successfully");
                navigate("/")
            }

        }
    }
    return (
        <div className="slider_area">
            <ToastContainer autoClose={2000} />
            <div className="single_slider d-flex align-items-center slider_bg_1" style={{ height: "450px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <h1 className="login_area_header">Login</h1>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4"></div>
                        <div className="col-lg-4 col-md-4">
                            <div>
                                <form className="form-contact login_form" method="post" id="loginForm" noValidate="novalidate">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input
                                                    type="email" id="email" name="email"
                                                    className="form-control rounded-2 border-black"
                                                    placeholder="Email" maxLength={50}
                                                    value={userModel.email}
                                                    onChange={e => setUserModel({ ...userModel, [e.target.name]: e.target.value })} />
                                                {errors.email && errors.email.length > 0 &&
                                                    <span className='text-danger'>{errors.email}</span>}
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input
                                                    type="password" id="password" name="password"
                                                    className="form-control rounded-2 border-black d-inline-block"
                                                    placeholder="Password" maxLength={20}
                                                    value={userModel.password}
                                                    onChange={e => setUserModel({ ...userModel, [e.target.name]: e.target.value })} />
                                                {errors.password && errors.password.length > 0 &&
                                                    <span className='text-danger'>{errors.password}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 text-left">
                                        <div className="form-group">
                                            <button onClick={formSubmit} className="btn btn-primary button button-loginForm smartseekr-primary-bg px-4 py-2">Login</button>
                                            <span className="mx-3">New user? <Link to="/register">Register here!</Link></span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}