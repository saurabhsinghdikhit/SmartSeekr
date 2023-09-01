import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import UserAuthentication from "../../api/auth"
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const customStyles = {
    content: {
        width: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validPhoneNumberRegex = RegExp(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i
)
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

Modal.setAppElement('#root');
export default function RegisterForm({ updateUserProfileData }) {
    let navigate = useNavigate()
    const [userTypes, setUserTypes] = useState([]);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState("Applicant");
    const [buttonText, setButtonText] = useState("Register Applicant");
    const [userModel, setUserModel] = useState({
        email: '',
        password: '',
        userType: '',
        userTypeValue: selectedUserType,
        employee: {
            firstName: "",
            lastName: "",
            contactNumber: "",
            dateOfBirth: '',
            address: "",
            city: "",
            province: "",
            country: "",
            pincode: "",
            userImage: ""
        },
        employer: {
            companyName: "",
            companyEmail: "",
            companyNumber: "",
            companyIndustry: "",
            companyDescription: "",
            address: "",
            city: "",
            province: "",
            country: "",
            pincode: "",
            companyLogo: ""
        }
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    // fetch data for the first time
    useEffect(function () {
        retriveUserType()
    }, []);
    async function validateUserForm() {
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
        if (!valid) {
            return;
        }
        const usr = await UserAuthentication.checkForValidEmail(userModel.email);
        if (usr == null)
            return;
        setModalOpen(true);
    }
    async function formSubmit(e) {
        e.preventDefault();
        const err = {};
        let valid = true;
        if (userModel.userTypeValue == "Applicant") {
            if (userModel.employee.firstName == "") {
                err.firstName = "Enter first name";
                valid = false;
            }
            if (userModel.employee.lastName == "") {
                err.lastName = "Enter last name";
                valid = false;
            }
            if (userModel.employee.contactNumber == "") {
                err.contactNumber = "Enter contact number";
                valid = false;
            }
            if (userModel.employee.contactNumber != "" && !validPhoneNumberRegex.test(userModel.employee.contactNumber)) {
                err.contactNumber = "Enter valid phone number";
                valid = false;
            }
            if (userModel.employee.address == "") {
                err.address = "Enter address";
                valid = false;
            }
            if (userModel.employee.city == "") {
                err.city = "Enter city";
                valid = false;
            }
            if (userModel.employee.province == "") {
                err.province = "Enter province";
                valid = false;
            }
            if (userModel.employee.pincode == "") {
                err.pincode = "Enter pincode";
                valid = false;
            }
        } else {
            if (userModel.employer.companyName == "") {
                err.companyName = "Enter company name";
                valid = false;
            }
            if (userModel.employer.companyNumber == "") {
                err.companyNumber = "Enter company number";
                valid = false;
            }
            if (userModel.employer.companyDescription == "") {
                err.companyDescription = "Enter company description";
                valid = false;
            }
            if (userModel.employer.companyNumber != "" && !validPhoneNumberRegex.test(userModel.employer.companyNumber)) {
                err.companyNumber = "Enter valid phone number";
                valid = false;
            }
            if (userModel.employer.companyIndustry == "") {
                err.companyIndustry = "Enter company industry";
                valid = false;
            }
            if (userModel.employer.address == "") {
                err.address = "Enter address";
                valid = false;
            }
            if (userModel.employer.city == "") {
                err.city = "Enter city";
                valid = false;
            }
            if (userModel.employer.province == "") {
                err.province = "Enter province";
                valid = false;
            }
            if (userModel.employer.pincode == "") {
                err.pincode = "Enter pincode";
                valid = false;
            }
        }
        setErrors(err);
        if (valid) {
            let usr = { ...userModel };
            if (usr.userTypeValue == "Applicant") {
                usr.employer = null;
                usr.employee.dateOfBirth = null;
            } else {
                usr.employee = null;

            }
            const register = await UserAuthentication.registerUser(usr);
            if (register) {
                if (usr.userTypeValue == "Applicant")
                    register.name = usr.employee.firstName;
                else
                    register.name = usr.employer.companyName;
                updateUserProfileData(register)
                setModalOpen(false);
                toast("Registered successfully");
                navigate("/")
            }
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        const user = { ...userModel }
        if (user.userTypeValue == "Applicant")
            user.employee[name] = value;
        else
            user.employer[name] = value;
        setUserModel(user);
    }
    function onUserTypeChange(e) {
        const selectedUserType = e.target.options[e.target.selectedIndex].text;
        const user = { ...userModel }
        user.userType = e.target.value;
        user.userTypeValue = selectedUserType;
        setUserModel(user)
        setSelectedUserType(selectedUserType);
        setButtonText(selectedUserType == "Applicant" ? "Register Applicant" : "Register Employer");
    }
    async function retriveUserType() {
        const userTypes = await UserAuthentication.getAllUserType();
        if (userTypes) {
            const user = { ...userModel }
            user.userType = userTypes[0].id;
            setUserModel(user);
            setUserTypes(userTypes)
        }
    }
    return (
        <div className="slider_area">
            <ToastContainer autoClose={2000} />
            <div className="single_slider d-flex align-items-center slider_bg_1" style={{ height: "450px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <h1>Register</h1>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4"></div>
                        <div className="col-lg-4 col-md-4">
                            <div>
                                <form className="form-contact register_form" method="post" id="registerForm" name="registerForm" onSubmit={formSubmit} noValidate="novalidate">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input
                                                    type="email" id="email" name="email" maxLength={50}
                                                    className="form-control rounded-2 border-black"
                                                    placeholder="Email"
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
                                        <div className="col-sm-12">
                                            <div className="form-group mb-3">
                                                <select onChange={onUserTypeChange} className="form-select border-black" name="userType" id="userType">
                                                    {userTypes && userTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 text-left">
                                        <div className="form-group">
                                            <a href="#!" onClick={validateUserForm} className="btn btn-primary button button-registerForm smartseekr-primary-bg px-4 py-2">{buttonText}</a>
                                            <span className="mx-3"><Link to="/login">Login here!</Link></span>
                                        </div>
                                    </div>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={() => setModalOpen(false)}
                                        style={customStyles}
                                        contentLabel="additional information">
                                        <h2>Fill Additional Information</h2>
                                        {selectedUserType == "Applicant" ? (
                                            <>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="firstName" name="firstName"
                                                                className="form-control rounded-2 border-black"
                                                                placeholder="First Name" maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employee.firstName} />
                                                            {errors.firstName && errors.firstName.length > 0 &&
                                                                <span className='text-danger'>{errors.firstName}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="lastName" name="lastName"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Last Name" maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employee.lastName} />
                                                            {errors.lastName && errors.lastName.length > 0 &&
                                                                <span className='text-danger'>{errors.lastName}</span>}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="phone" id="contactNumber" name="contactNumber"
                                                                className="form-control rounded-2 border-black"
                                                                placeholder="111 111 1111 or 111-111-1111" maxLength={13}
                                                                onChange={handleChange}
                                                                value={userModel.employee.contactNumber} />
                                                            {errors.contactNumber && errors.contactNumber.length > 0 &&
                                                                <span className='text-danger'>{errors.contactNumber}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="address" name="address"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Address" maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employee.address} />
                                                            {errors.address && errors.address.length > 0 &&
                                                                <span className='text-danger'>{errors.address}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="city" name="city"
                                                                className="form-control rounded-2 border-black"
                                                                placeholder="City" maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employee.city} />
                                                            {errors.city && errors.city.length > 0 &&
                                                                <span className='text-danger'>{errors.city}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="province" name="province"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Provice" maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employee.province} />
                                                            {errors.province && errors.province.length > 0 &&
                                                                <span className='text-danger'>{errors.province}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <select id="country" name="country"
                                                                className="form-control rounded-2 border-black"
                                                                onChange={handleChange}
                                                                value={userModel.employee.country} >
                                                                <option>Canada</option>
                                                                <option>India</option>
                                                                <option>US</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="pincode" name="pincode"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Pin code" maxLength={6}
                                                                onChange={handleChange}
                                                                value={userModel.employee.pincode} />
                                                            {errors.pincode && errors.pincode.length > 0 &&
                                                                <span className='text-danger'>{errors.pincode}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <button onClick={formSubmit} className="btn btn-primary button button-registerForm smartseekr-primary-bg px-4 py-2">Register now</button>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <a href="#" onClick={() => setModalOpen(false)} className="btn btn-danger button button-registerForm smartseekr-secondary-bg px-4 py-2">Umm not right now!</a>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="companyName" name="companyName"
                                                                className="form-control rounded-2 border-black"
                                                                placeholder="Company name" maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employer.companyName} />
                                                            {errors.companyName && errors.companyName.length > 0 &&
                                                                <span className='text-danger'>{errors.companyName}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="phone" id="companyNumber" name="companyNumber"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="111 111 1111 or 111-111-1111"
                                                                maxLength={13}
                                                                onChange={handleChange}
                                                                value={userModel.employer.companyNumber} />
                                                            {errors.companyNumber && errors.companyNumber.length > 0 &&
                                                                <span className='text-danger'>{errors.companyNumber}</span>}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <textarea
                                                                type="text" id="companyDescription" name="companyDescription"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Company Description"
                                                                maxLength={500}
                                                                onChange={handleChange}
                                                                value={userModel.employer.companyDescription} />
                                                            {errors.companyDescription && errors.companyDescription.length > 0 &&
                                                                <span className='text-danger'>{errors.companyDescription}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="companyIndustry" name="companyIndustry"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Company type"
                                                                maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employer.companyIndustry} />
                                                            {errors.companyIndustry && errors.companyIndustry.length > 0 &&
                                                                <span className='text-danger'>{errors.companyIndustry}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="address" name="address"
                                                                className="form-control rounded-2 border-black"
                                                                placeholder="Address"
                                                                maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employer.address} />
                                                            {errors.address && errors.address.length > 0 &&
                                                                <span className='text-danger'>{errors.address}</span>}
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="city" name="city"
                                                                className="form-control rounded-2 border-black"
                                                                placeholder="City"
                                                                maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employer.city} />
                                                            {errors.city && errors.city.length > 0 &&
                                                                <span className='text-danger'>{errors.city}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="province" name="province"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Provice"
                                                                maxLength={50}
                                                                onChange={handleChange}
                                                                value={userModel.employer.province} />
                                                            {errors.province && errors.province.length > 0 &&
                                                                <span className='text-danger'>{errors.province}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <select id="country" name="country"
                                                                className="form-control rounded-2 border-black"
                                                                onChange={handleChange}
                                                                value={userModel.employer.country} >
                                                                <option>Canada</option>
                                                                <option>India</option>
                                                                <option>US</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" id="pincode" name="pincode"
                                                                className="form-control rounded-2 border-black d-inline-block"
                                                                placeholder="Pin code"
                                                                onChange={handleChange}
                                                                maxLength={6}
                                                                value={userModel.employer.pincode} />
                                                            {errors.pincode && errors.pincode.length > 0 &&
                                                                <span className='text-danger'>{errors.pincode}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <button onClick={formSubmit} className="btn btn-primary button button-registerForm smartseekr-primary-bg px-4 py-2">Register now</button>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <a href="#" onClick={() => setModalOpen(false)} className="btn btn-danger button button-registerForm smartseekr-secondary-bg px-4 py-2">Umm not right now!</a>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </Modal>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}