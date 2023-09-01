import { React, useState, useEffect } from "react";
import JobDataService from "../../api/job-services"
import { toast,ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
const validPhoneNumberRegex = RegExp(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i
)
export default function EmployerProfile() {
    const items = JSON.parse(localStorage.getItem('userData'));
    let userProfile = {};
    const [employerDetails, setEmployerDetails] = useState({});
    const [errors, setErrors] = useState({});
    if (Object.keys(userProfile).length <= 0)
        userProfile = items;
    useEffect(() => {
        async function getEmployerDetails(id) {
            const employer = await JobDataService.GetEmployerDetails(id);
            setEmployerDetails(employer);
        }
        if (userProfile?.id) {
            getEmployerDetails(userProfile?.employer?.id);
        }

    }, [userProfile?.id])
    async function personalInfoFormSubmit(e) {
        e.preventDefault();
        const err = {};
        let valid = true;
        if (employerDetails.companyName == "") {
            err.companyName = "Enter company name";
            valid = false;
        }
        if (employerDetails.companyNumber == "") {
            err.companyNumber = "Enter company number";
            valid = false;
        }
        if (employerDetails.companyDescription == "") {
            err.companyDescription = "Enter company description";
            valid = false;
        }
        if (employerDetails.companyNumber != "" && !validPhoneNumberRegex.test(employerDetails.companyNumber)) {
            err.companyNumber = "Enter valid phone number";
            valid = false;
        }
        if (employerDetails.companyIndustry == "") {
            err.companyIndustry = "Enter company industry";
            valid = false;
        }
        if (employerDetails.address == "") {
            err.address = "Enter address";
            valid = false;
        }
        if (employerDetails.city == "") {
            err.city = "Enter city";
            valid = false;
        }
        if (employerDetails.province == "") {
            err.province = "Enter province";
            valid = false;
        }
        if (employerDetails.pincode == "") {
            err.pincode = "Enter pincode";
            valid = false;
        }
        setErrors(err);
        if (valid) {
            let employer = { ...employerDetails };
            const updateUserProfile = await JobDataService.UpdateEmployer(employer);
            if (updateUserProfile) {
                //updateUserProfile.name = employerDetails.companyName;
                //updateUserProfileData({ ...userProfile, employee: updateUserProfile, name: usr.employee.firstName })
                toast("Profile updated successfully");
            }
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        const employer = { ...employerDetails }
        employer[name] = value;
        setEmployerDetails(employer);
    }
    return (
        <div className="container mb-3">
            <ToastContainer autoClose={2000} />
            <h2>Update Profile</h2>
            <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input
                                    type="text" id="companyName" name="companyName"
                                    className="form-control rounded-2 border-black"
                                    placeholder="Company name" maxLength={50}
                                    onChange={handleChange}
                                    value={employerDetails.companyName} />
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
                                    value={employerDetails.companyNumber} />
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
                                    value={employerDetails.companyDescription} />
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
                                    value={employerDetails.companyIndustry} />
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
                                    value={employerDetails.address} />
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
                                    value={employerDetails.city} />
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
                                    value={employerDetails.province} />
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
                                    value={employerDetails.country} >
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
                                    value={employerDetails.pincode} />
                                {errors.pincode && errors.pincode.length > 0 &&
                                    <span className='text-danger'>{errors.pincode}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <button onClick={personalInfoFormSubmit} className="btn btn-primary button button-registerForm smartseekr-primary-bg px-4 py-2">Update</button>
                            <Link to={"/"} className="btn btn-danger button button-registerForm smartseekr-secondary-bg px-4 py-2 mx-2">Cancel</Link>
                        </div>
                    </div>
        </div>
    );
}