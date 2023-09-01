/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react"
import Modal from 'react-modal';
import JobDataService from "../../api/job-services"
import UserAuthentication from "../../api/auth"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { storage } from '../../services/firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Form, FormControl, InputGroup, Tab, Table, Tabs } from 'react-bootstrap'
import EmployeeeDataService from "../../api/employee-services";

const customStyles = {
    content: {
        width: '85%',
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
}

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validPhoneNumberRegex = RegExp(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i
)

Modal.setAppElement('#root');
export default function ProfileForm({ updateUserProfileData }) {
    // const [modalIsOpen, setModalOpen] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState("Applicant");
    const [userProfileData, setUserProfileData] = useState({});
    const [employeeResume, setEmployeeResume] = useState({});
    const [resumeUrl, setResumeUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(null);
    const items = JSON.parse(localStorage.getItem('userData'));
    let userProfile = {};
    if (Object.keys(userProfile).length <= 0)
        userProfile = items;
    const [key, setKey] = useState('personal_info');
    const educationInit = {
        id: '',
        userId: userProfile?.id ?? '',
        degreeName: '',
        universityName: '',
        startingDate: '',
        completionDate: '',
        cgpa: '',
        isPursuing: false,
    };
    const [selectedEducation, setSelectedEducation] = useState(educationInit);
    const [educations, setEducations] = useState([]);
    const workExperienceInit = {
        id: '',
        userId: userProfile?.id ?? '',
        jobTitle: '',
        companyName: '',
        city: '',
        country: '',
        description: '',
        startDate: '',
        endDate: '',
        isWorking: false
    };
    const [selectedWorkExperience, setSelectedWorkExperience] = useState(workExperienceInit);
    const [workExperiences, setWorkExperiences] = useState([]);
    let navigate = useNavigate()
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
    function handleChange(e) {
        const { name, value } = e.target;
        const user = { ...userModel }
        if (user.userTypeValue == "Applicant")
            user.employee[name] = value;
        else
            user.employer[name] = value;
        setUserModel(user);
    }

    async function personalInfoFormSubmit(e) {
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
            if (userModel.employee.dateOfBirth == "") {
                err.pincode = "Enter birthdate";
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
            let updateUserProfile = ''
            if (usr.userTypeValue == "Applicant") {
                usr.employer = null;
                updateUserProfile = await EmployeeeDataService.updateEmployeeDetails(usr.employee);
            } else {
                usr.employee = null;
                updateUserProfile = await JobDataService.UpdateEmployer(usr);
            }


            if (updateUserProfile) {
                if (usr.userTypeValue === "Applicant")
                    updateUserProfile.name = usr.employee.firstName;
                else
                    updateUserProfile.name = usr.employer.companyName;
                updateUserProfileData({ ...userProfile, employee: updateUserProfile, name: usr.employee.firstName })
                toast("Profile updated successfully");
            }
        }
    }

    function handleEducationChange(e) {
        const { name, value, checked } = e.target;

        if (name) {
            if (name === 'isPursuing') {
                setSelectedEducation({
                    ...selectedEducation,
                    [name]: checked,
                    completionDate: checked ? '' : selectedEducation.completionDate
                })
            } else {
                setSelectedEducation({
                    ...selectedEducation,
                    [name]: value
                })
            }

        }
    }

    async function educationInfoFormSubmit(e) {
        e.preventDefault()
        const employeeEducations = await EmployeeeDataService.saveEducation(selectedEducation);
        if (selectedEducation.id) {
            toast("Education updated successfully!");
        } else {
            toast("Education added successfully!");
        }

        setSelectedEducation(educationInit);
        setEducations(employeeEducations);
    }

    async function handleEditEducation(educationId) {
        const educationDetails = educations.find(e => e.id === educationId);
        setSelectedEducation(educationDetails)
    }

    async function handleCancelEducationInfo() {
        setSelectedEducation(educationInit);
    }

    function handleWorkExperienceChange(e) {
        const { name, value, checked } = e.target;

        if (name) {
            if (name === 'isWorking') {
                setSelectedWorkExperience({
                    ...selectedWorkExperience,
                    [name]: checked,
                    endDate: checked ? '' : selectedWorkExperience.endDate
                })
            } else {
                setSelectedWorkExperience({
                    ...selectedWorkExperience,
                    [name]: value
                })
            }

        }
    }

    async function handleEditWorkExperience(workExperienceId) {
        const workExperienceDetails = workExperiences.find(e => e.id === workExperienceId);
        setSelectedWorkExperience(workExperienceDetails)
    }

    async function handleCancelworkExperienceInfo() {
        setSelectedWorkExperience(workExperienceInit);
    }

    async function workExperienceInfoFormSubmit(e) {
        e.preventDefault()
        const employeeWorkExperiences = await EmployeeeDataService.saveWorkExperience(selectedWorkExperience);
        if (selectedWorkExperience.id) {
            toast("Work Experience updated successfully!");
        } else {
            toast("Work Experience added successfully!");
        }

        setSelectedWorkExperience(workExperienceInit);
        setWorkExperiences(employeeWorkExperiences);
    }

    useEffect(() => {
        if (userProfileData && userProfileData.id) {
            setUserModel({
                ...userModel,
                employee: userProfileData
            })
        }
    }, [userProfileData])

    useEffect(() => {
        async function getUserProfileData(userId) {
            const userProfileData = await EmployeeeDataService.getEmployeeDetails(userId)
            setUserProfileData(userProfileData)
        }
        async function getEducationDetails() {
            const educationDetails = await EmployeeeDataService.getAllEducations(userProfile?.id);
            setEducations(educationDetails)
        }

        async function getWorkExperienceDetails() {
            const workExperienceDetails = await EmployeeeDataService.getAllWorkExperiences(userProfile?.id);
            setWorkExperiences(workExperienceDetails)
        }
        async function GetEmployeeResume() {
            const resume = await EmployeeeDataService.GetEmployeeResume(userProfile?.id);
            setEmployeeResume(resume||{})
        }

        if (userProfile?.id) {
            getUserProfileData(userProfile?.id)
            getEducationDetails();
            getWorkExperienceDetails();
            GetEmployeeResume();
        }


    }, [])
    function getExtension(filename) {
        return filename.split('.').pop()
      }
    const uploadResume = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        const extension = getExtension(file.name);
        if(extension!="pdf" && getExtension(file.name)!="doc" && getExtension(file.name)!="docx")
        {
            toast("Only pdf and docx");
            return;
        }
        if (!file) return;
        const storageRef = ref(storage, `resumes/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const uploadedResume = {userId:userProfile?.id,fileName:file.name};
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
            },
            (error) => {
                toast(error);
                setProgresspercent(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setResumeUrl(downloadURL)
                    setProgresspercent(null);
                    uploadedResume.resumeUrl = downloadURL;
                    const employeeResume = await EmployeeeDataService.SaveEmployeeResumeData(uploadedResume);
                    setEmployeeResume(employeeResume);
                    document.getElementById('resumeFile').value = "";
                    toast("Resume Uploaded");
                });
            }
        );
    }

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <h2>Update Profile</h2>
            <>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="personal_info" title="Personal Information">
                        <div className="container custom-modal-container my-2">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
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
                                        <label htmlFor="lastName">Last Name</label>
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
                                        <label htmlFor="contactNumber">Contact Number</label>
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
                                        <label htmlFor="address">Address</label>
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
                                        <label htmlFor="city">City</label>
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
                                        <label htmlFor="province">Province</label>
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
                                        <label htmlFor="country">Country</label>
                                        <select id="country" name="country"
                                            className="form-control form-select rounded-2 border-black"
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
                                        <label htmlFor="pincode">Pincode</label>
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
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <input
                                            type="date" id="dateOfBirth" name="dateOfBirth"
                                            className="form-control rounded-2 border-black d-inline-block"
                                            placeholder="Date of Birth"
                                            onChange={handleChange}
                                            value={userModel.employee.dateOfBirth || ''} />
                                        {errors.dateOfBirth && errors.dateOfBirth.length > 0 &&
                                            <span className='text-danger'>{errors.dateOfBirth}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-sm-6">
                                    <button onClick={personalInfoFormSubmit} className="btn btn-primary button button-registerForm smartseekr-primary-bg px-4 py-2">Save</button>
                                    <Link to={"/"} className="btn btn-danger button button-registerForm smartseekr-secondary-bg px-4 py-2 mx-2">Cancel</Link>
                                </div>
                            </div>
                        </div>

                    </Tab>
                    <Tab eventKey="education_info" title="Education Details">
                        <div className="container custom-modal-container my-2">
                            <Form onSubmit={educationInfoFormSubmit}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="degreeName">Degree Name</label>
                                            <input
                                                type="text" id="degreeName" name="degreeName"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="Degree Name" maxLength={50}
                                                onChange={handleEducationChange}
                                                required
                                                value={selectedEducation.degreeName} />
                                            {errors.degreeName && errors.degreeName.length > 0 &&
                                                <span className='text-danger'>{errors.degreeName}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="universityName">University Name</label>
                                            <input
                                                type="text" id="universityName" name="universityName"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="University Name" maxLength={50}
                                                onChange={handleEducationChange}
                                                required
                                                value={selectedEducation.universityName} />
                                            {errors.universityName && errors.universityName.length > 0 &&
                                                <span className='text-danger'>{errors.universityName}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="cgpa">CGPA</label>
                                            <input
                                                type="number" id="cgpa" name="cgpa"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="cgpa" max={10} min={1}
                                                step={'0.01'}
                                                onChange={handleEducationChange}
                                                value={selectedEducation.cgpa} />
                                            {errors.cgpa && errors.cgpa.length > 0 &&
                                                <span className='text-danger'>{errors.cgpa}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="startingDate">Starting Date</label>
                                            <input
                                                type="date" id="startingDate" name="startingDate"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="Starting Date"
                                                onChange={handleEducationChange}
                                                required
                                                value={selectedEducation.startingDate ? selectedEducation.startingDate.split('T')[0] : ''} />
                                            {errors.startingDate && errors.startingDate.length > 0 &&
                                                <span className='text-danger'>{errors.startingDate}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="completionDate">Completion Date</label>
                                            <input
                                                type="date" id="completionDate" name="completionDate"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="Completion Date"
                                                onChange={handleEducationChange}
                                                disabled={selectedEducation.isPursuing}
                                                required={!selectedEducation.isPursuing}
                                                value={!selectedEducation.isPursuing ?
                                                    (selectedEducation.completionDate ? selectedEducation.completionDate.split('T')[0] : '') : ''} />
                                            {errors.completionDate && errors.completionDate.length > 0 &&
                                                <span className='text-danger'>{errors.completionDate}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label className="d-block">&nbsp;</label>
                                            <input type="checkbox" style={{ marginTop: '12px', color: '#000', display: 'inline-block' }}
                                                name="isPursuing" id="isPursuing" checked={selectedEducation.isPursuing}
                                                onChange={handleEducationChange} />&nbsp;
                                            <label htmlFor="isPursuing"> Currently Pursuing</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="d-block">&nbsp;</label>
                                        <button type="submit" className="btn btn-primary"><i className="fa fa-add"></i></button>
                                        <button type="reset" className="btn btn-secondary mx-2" onClick={handleCancelEducationInfo}><i className="fa fa-x cursor-pointer"></i></button>
                                    </div>
                                </div>
                            </Form>
                            <div className="row">
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Degree Name</th>
                                            <th>University Name</th>
                                            <th>CGPA</th>
                                            <th>Starting Date</th>
                                            <th>Completion Date</th>
                                            <th>Currently Pursuing</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            educations && educations.length != 0 && educations.map((edu, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{edu.degreeName}</td>
                                                        <td>{edu.universityName}</td>
                                                        <td>{edu.cgpa}</td>
                                                        <td>{edu.startingDate ? edu.startingDate.split('T')[0] : '-'}</td>
                                                        <td>{!edu.isPursuing ? (edu.completionDate ? edu.completionDate.split('T')[0] : '-') : '-'}</td>
                                                        <td>{edu.isPursuing ? 'Yes' : 'No'}</td>
                                                        <td><i className="fa fa-pencil cursor-pointer" title="Edit" onClick={() => { handleEditEducation(edu.id) }}></i></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            educations.length === 0 &&
                                            <tr>
                                                <td colSpan={8} className="text-center">No Records Found!</td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="professional_info" title="Work Details">
                        <div className="container custom-modal-container my-2">
                            <Form onSubmit={workExperienceInfoFormSubmit}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="jobTitle">Job Title</label>
                                            <input
                                                type="text" id="jobTitle" name="jobTitle"
                                                className="form-control rounded-2 border-black"
                                                placeholder="Job Title" maxLength={50}
                                                onChange={handleWorkExperienceChange}
                                                value={selectedWorkExperience.jobTitle}
                                                required />
                                            {errors.jobTitle && errors.jobTitle.length > 0 &&
                                                <span className='text-danger'>{errors.jobTitle}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            <label htmlFor="companyName">Company Name</label>
                                            <input
                                                type="text" id="companyName" name="companyName"
                                                className="form-control rounded-2 border-black"
                                                placeholder="Company Name" maxLength={50}
                                                onChange={handleWorkExperienceChange}
                                                value={selectedWorkExperience.companyName}
                                                required />
                                            {errors.companyName && errors.companyName.length > 0 &&
                                                <span className='text-danger'>{errors.companyName}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text" id="city" name="city"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="City" maxLength={50}
                                                onChange={handleWorkExperienceChange}
                                                value={selectedWorkExperience.city} />
                                            {errors.city && errors.city.length > 0 &&
                                                <span className='text-danger'>{errors.city}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="country">Country</label>
                                            <select id="country" name="country"
                                                className="form-control rounded-2 border-black"
                                                onChange={handleWorkExperienceChange}
                                                value={selectedWorkExperience.country} >
                                                <option value={'Canada'}>Canada</option>
                                                <option value={'India'}>India</option>
                                                <option value={'US'}>US</option>
                                            </select>
                                            {errors.country && errors.country.length > 0 &&
                                                <span className='text-danger'>{errors.country}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea id="description" name="description"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="Description" rows={2}
                                                onChange={handleWorkExperienceChange}
                                                value={selectedWorkExperience.description}
                                                required />
                                            {errors.description && errors.description.length > 0 &&
                                                <span className='text-danger'>{errors.description}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input
                                                type="date" id="startDate" name="startDate"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="Start Date"
                                                onChange={handleWorkExperienceChange}
                                                value={selectedWorkExperience.startDate ? selectedWorkExperience.startDate.split('T')[0] : ''}
                                                required />
                                            {errors.startDate && errors.startDate.length > 0 &&
                                                <span className='text-danger'>{errors.startDate}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="endDate">End Date</label>
                                            <input
                                                type="date" id="endDate" name="endDate"
                                                className="form-control rounded-2 border-black d-inline-block"
                                                placeholder="End Date"
                                                onChange={handleWorkExperienceChange}
                                                value={!selectedWorkExperience.isWorking ?
                                                    (selectedWorkExperience.endDate ? selectedWorkExperience.endDate.split('T')[0] : '') : ''}
                                                disabled={selectedWorkExperience.isWorking}
                                                required={!selectedWorkExperience.isWorking} />
                                            {errors.endDate && errors.endDate.length > 0 &&
                                                <span className='text-danger'>{errors.endDate}</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label className="d-block">&nbsp;</label>
                                            <input type="checkbox" style={{ marginTop: '12px', color: '#000', display: 'inline-block' }} name="isWorking" id="isWorking"
                                                checked={selectedWorkExperience.isWorking} onChange={handleWorkExperienceChange} />&nbsp;
                                            <label htmlFor="isWorking" style={{ color: '#000' }}> Currently Working Here</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <label className="d-block">&nbsp;</label>
                                        <button type="submit" className="btn btn-primary"><i className="fa fa-add"></i></button>
                                        <button type="button" className="btn btn-secondary mx-2" onClick={handleCancelworkExperienceInfo}><i className="fa fa-x"></i></button>
                                    </div>
                                </div>
                            </Form>
                            <div className="row">
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Job Title</th>
                                            <th>Company Name</th>
                                            <th>Starting Date</th>
                                            <th>Completion Date</th>
                                            <th>Currently Working</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            workExperiences && workExperiences.length != 0 && workExperiences.map((wrk, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{wrk.jobTitle}</td>
                                                        <td>{wrk.companyName}</td>
                                                        <td>{wrk.startDate ? wrk.startDate.split('T')[0] : '-'}</td>
                                                        <td>{!wrk.isWorking ? (wrk.endDate ? wrk.endDate.split('T')[0] : '-') : '-'}</td>
                                                        <td>{wrk.isWorking ? 'Yes' : 'No'}</td>
                                                        <td><i className="fa fa-pencil cursor-pointer" title="Edit" onClick={() => { handleEditWorkExperience(wrk.id) }}></i></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            workExperiences.length === 0 &&
                                            <tr>
                                                <td colSpan={7} className="text-center">No Records Found!</td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="resume" title="Resume">
                        <div className="container my-2 mb-4">
                            <div className="row mb-4 mt-4">
                            <div className="col-lg-4">
                                Resume:<a href={employeeResume?.resumeUrl}><strong> {employeeResume?.fileName||'Not uploaded yet'}</strong></a>
                                </div>
                                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4">
                                {
                                        progresspercent!=null &&
                                        <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: `${progresspercent}%` }} aria-valuenow="0%" aria-valuemin="0" aria-valuemax="100">{progresspercent}%</div>
                                        </div>
                                        
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <form onSubmit={uploadResume} className='form'>
                                        <input required id="resumeFile" accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" type='file' />
                                        <button className="btn btn-primary" type='submit'>Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </>
        </div>
    )
}