import { React, useState, useEffect } from "react";
import JobDataService from "../../api/job-services"
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

export default function ApplicantJobDetails() {
    let navigate = useNavigate()
    const items = JSON.parse(localStorage.getItem('userData'));
    let userProfile = {};
    const [link, setLink] = useState("");
    if (Object.keys(userProfile).length <= 0)
        userProfile = items;
    const { jobId } = useParams();
    const [jobDetails, setJobDetails] = useState({});
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
    if (jobId == null)
        navigate('/all-jobs');
    async function applyForJob() {
        const job = await JobDataService.applyForAJob(jobId, userProfile?.id);
        if (job) {
            toast('You have successfully applied for this job!');
            setIsAlreadyApplied(true);
        }

    }
    useEffect(() => {
        async function getJobDetails() {
            const job = await JobDataService.getJobById(jobId);
            setLink('https://maps.google.com/maps?q='+job.city+'&t=&z=15&ie=UTF8&iwloc=&output=embed');
            if (userProfile?.id) {
                const isApplied = await JobDataService.checkForAppliedJob(jobId, userProfile?.id);
                setIsAlreadyApplied(isApplied);
            }
            setJobDetails(job || {});
        }
        getJobDetails();
    }, [jobId]);
    return (
        <>
            <ToastContainer autoClose={2000} />
            <div className="bradcam_area bradcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text">
                                <h3>{jobDetails.title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="job_details_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="job_details_header">
                                <div className="single_jobs white-bg d-flex justify-content-between">
                                    <div className="jobs_left d-flex align-items-center">

                                        <div className="jobs_conetent">
                                            <h4>{jobDetails.title}</h4>
                                            <div className="links_locat d-flex align-items-center">
                                                <div className="location">
                                                    <p> <i className="fa fa-map-marker"></i> {jobDetails.city}, {jobDetails.province},{jobDetails.country} ({jobDetails.pincode})</p>
                                                </div>
                                                <div className="location">
                                                    <p> <i className="fa fa-clock-o"></i> {jobDetails.jobType}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jobs_right">
                                        <div className="apply_now">
                                            {userProfile &&
                                                isAlreadyApplied == false &&
                                                <button onClick={applyForJob} className="boxed-btn4">Apply</button>
                                            }
                                            {userProfile &&
                                                isAlreadyApplied == true &&
                                                <button disabled className="boxed-btn4">Applied</button>
                                            }
                                            {userProfile == null &&
                                                <Link to={"/login"} className="boxed-btn4">Login to apply</Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="descript_wrap white-bg">
                                <div className="single_wrap">
                                    <h4>Job description</h4>
                                    {jobDetails.description}
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="col-lg-4">
                            <div className="job_sumary">
                                <div className="summery_header">
                                    <h3>Job Summary</h3>
                                </div>
                                <div className="job_content">
                                    <ul>
                                        <li>Published on: <span>{new Date(jobDetails.created_At).toLocaleDateString()}</span></li>
                                        <li>Vacancy: <span>{jobDetails.noOfPeople} position</span></li>
                                        <li>Salary: <span>{jobDetails.salary} {jobDetails.salaryBasedOn}</span></li>
                                        <li>Location: <span>{jobDetails.city}, {jobDetails.country}</span></li>
                                        <li>Job Nature: <span> {jobDetails.jobType}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="job_location_wrap">
                                <div className="job_lok_inner">
                                    <iframe src={link} width="100%" height="450" frameBorder={0} style={{border: 0}} allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}