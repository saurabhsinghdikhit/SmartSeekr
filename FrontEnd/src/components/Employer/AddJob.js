import { React, useState, useEffect } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { Link,useNavigate, useParams } from "react-router-dom";
import JobDataService from "../../api/job-services"
import { toast,ToastContainer } from 'react-toastify';
function CreateJob() {
    let navigate = useNavigate()
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedJobSchedules, setSelectedJobSchedules] = useState([]);
    function onJobTypeSelect(selectedList, selectedItem) {
        setSelectedJobTypes(selectedList); 
        setjobAddModel({ ...jobAddModel, jobType: selectedList.map(a => a.typeName).toString() })
    }
    function onJobTypeRemove(selectedList, removedItem) {
        setSelectedJobTypes(selectedList); 
        setjobAddModel({ ...jobAddModel, jobType: selectedList.map(a => a.typeName).toString() })
    }
    function onScheduleSelect(selectedList, selectedItem) {
        setSelectedJobSchedules(selectedList); 
        setjobAddModel({ ...jobAddModel, Schedule: selectedList.map(a => a.scheduleName).toString() })
    }
    function onScheduleRemove(selectedList, removedItem) {
        setSelectedJobSchedules(selectedList); 
        setjobAddModel({ ...jobAddModel, Schedule: selectedList.map(a => a.scheduleName).toString() })
    }
    const items = JSON.parse(localStorage.getItem('userData'));
    let userProfile = {};
    if (Object.keys(userProfile).length <= 0)
        userProfile = items;
    const { jobId } = useParams();
    
    const [jobTypes, setJobTypes] = useState([]);
    const [jobSchedules, setJobSchedule] = useState([]);
    const [jobAddModel, setjobAddModel] = useState({
        employerId:userProfile?.employer?.id,
        title: '',
        description: '',
        salary: 0,
        salaryBasedOn: 'Per Hour',
        noOfPeople: 1,
        Schedule: '',
        jobType: '',
        address: "",
        city: "",
        province: "",
        country: "",
        pincode: "",
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        async function getAllDetails() {
            const types = await JobDataService.GetAllJobTypes();
            setJobTypes(types || [])
            const schedules = await JobDataService.GetAllJobSchedules();
            setJobSchedule(schedules || [])
            console.log(selectedJobTypes);
            if(jobId){
                const jobDetails = await JobDataService.getJobById(jobId)
                setjobAddModel(jobDetails|| jobAddModel);
                let selectedJobType = [];
                const splitJobString = jobDetails.jobType?.split(",");
                for (let index = 0; index < splitJobString.length; index++) {
                    selectedJobType.push(types.filter(type => {
                        return type.typeName === splitJobString[index];
                      }));
                }
                setSelectedJobTypes(selectedJobType[0]|| []);
                let selectedJobSchedule = [];
                const splitJobSchedule = jobDetails.schedule?.split(",");
                for (let index = 0; index < splitJobSchedule.length; index++) {
                    selectedJobSchedule.push(schedules.filter(type => {
                        return type.scheduleName === splitJobSchedule[index];
                      }));
                }
                setSelectedJobSchedules(selectedJobSchedule[0]||[]);
            }
            
            
        }
        if (userProfile?.id) {
            getAllDetails();
        }

    }, [userProfile?.id])
    function handleChange(e) {
        const { name, value } = e.target;
        const job = { ...jobAddModel }
        job.jobDetails[name] = value;
        setjobAddModel(job);
    }
    async function addUpdateJob(e) {
        e.preventDefault();
        const err = {};
        let valid = true;
        if (jobAddModel.title == "") {
            err.jobTitle = "Enter Job Title";
            valid = false;
        }
        if (jobAddModel.noOfPeople == "") {
            err.noOfPeople = "Please enter number of people you want to hire";
            valid = false;
        }
        if (jobAddModel.salary == "") {
            err.salary = "Please enter salary";
            valid = false;
        }
        if (jobAddModel.description == "") {
            err.description = "Please enter job description";
            valid = false;
        }
        if (jobAddModel.address == "") {
            err.address = "Please enter address";
            valid = false;
        }
        if (jobAddModel.city == "") {
            err.city = "Please enter city";
            valid = false;
        }
        if (jobAddModel.province == "") {
            err.province = "Please enter province";
            valid = false;
        }
        if (jobAddModel.country == "") {
            err.country = "Please enter country";
            valid = false;
        }
        if (jobAddModel.pincode == "") {
            err.pincode = "Please enter pincode";
            valid = false;
        }

        setErrors(err);
        if (valid) {
            let data = { ...jobAddModel };
            if(jobId){
                const register = await JobDataService.UpdateJob(data);
                if (register) {
                    toast("Job Updated sucessfully");
                    navigate("/")
                }
            }else{
                const register = await JobDataService.AddJob(data);
                if (register) {
                    toast("Job Added sucessfully");
                    navigate("/")
                }
            }
            
        }
    }
    return (
        <div className="single_slider d-flex align-items-center slider_bg_1" style={{ margin: "20px" }}>
            <ToastContainer autoClose={2000} />
            <div className="container">
                <div className="row align-items-center">
                    <h1>{jobId?"Update details of the job":"Add Details of a job"}</h1>
                </div>
                <form className="form-contact register_form" onSubmit={addUpdateJob} method="post" id="registerForm" name="registerForm" noValidate="novalidate">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input
                                    type="text" id="title" name="title" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="job title"
                                    value={jobAddModel.title}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.jobTitle && errors.jobTitle.length > 0 &&
                                    <span className='text-danger'>{errors.jobTitle}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="number" id="noOfPeople" name="noOfPeople" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="no of people want to hire"
                                    value={jobAddModel.noOfPeople}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.noOfPeople && errors.noOfPeople.length > 0 &&
                                    <span className='text-danger'>{errors.noOfPeople}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <Multiselect
                                    selectedValues={selectedJobTypes}
                                    options={jobTypes}
                                    placeholder="Select Job Type"
                                    onSelect={onJobTypeSelect}
                                    onRemove={onJobTypeRemove}
                                    displayValue="typeName"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group border-black">
                                <Multiselect
                                    selectedValues={selectedJobSchedules}
                                    options={jobSchedules}
                                    placeholder="Select Schedule for the job"
                                    onSelect={onScheduleSelect}
                                    onRemove={onScheduleRemove}
                                    displayValue="scheduleName"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="number" id="salary" name="salary" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="salary"
                                    value={jobAddModel.salary}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.salary && errors.salary.length > 0 &&
                                    <span className='text-danger'>{errors.salary}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <select id="salaryBasedOn" name="salaryBasedOn"
                                    className="form-control form-select rounded-2 border-black"
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })}
                                    value={jobAddModel.salaryBasedOn} >
                                    <option>Per Hour</option>
                                    <option>Per day</option>
                                    <option>Per day</option>
                                    <option>Per Week</option>
                                    <option>Per Month</option>
                                    <option>Per Year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="text" id="address" name="address" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="address"
                                    value={jobAddModel.address}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.address && errors.address.length > 0 &&
                                    <span className='text-danger'>{errors.address}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="text" id="city" name="city" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="City name"
                                    value={jobAddModel.city}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.city && errors.city.length > 0 &&
                                    <span className='text-danger'>{errors.city}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="text" id="province" name="province" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="Provice / State"
                                    value={jobAddModel.province}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.province && errors.province.length > 0 &&
                                    <span className='text-danger'>{errors.province}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="text" id="country" name="country" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="Country"
                                    value={jobAddModel.country}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.country && errors.country.length > 0 &&
                                    <span className='text-danger'>{errors.country}</span>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <input type="text" id="pincode" name="pincode" maxLength={100}
                                    className="form-control rounded-2 border-black"
                                    placeholder="Pincode / Zipcode"
                                    value={jobAddModel.pincode}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })} />
                                {errors.pincode && errors.pincode.length > 0 &&
                                    <span className='text-danger'>{errors.pincode}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <textarea id="description" name="description" placeholder="description"
                                    className="form-control rounded-2 border-black d-inline-block"
                                    value={jobAddModel.description}
                                    onChange={e => setjobAddModel({ ...jobAddModel, [e.target.name]: e.target.value })}></textarea>
                                {errors.description && errors.description.length > 0 &&
                                    <span className='text-danger'>{errors.description}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <button style={{ width: "100%" }} type="submit" className="btn btn-primary">{jobId?"Update Job Details":"Post Job"}</button>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <Link to={"/"} style={{ width: "100%" }} className="btn btn-outline-primary">Cancel</Link>
                        </div>

                    </div>
                </form>
            </div >
        </div >
    )
}
export default CreateJob;