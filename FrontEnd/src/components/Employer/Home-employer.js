import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import JobDataService from "../../api/job-services"
import { React, useState, useEffect } from "react";

function HomeEmployer() {
  const items = JSON.parse(localStorage.getItem('userData'));
  let userProfile = {};
  if (Object.keys(userProfile).length <= 0)
    userProfile = items;
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    async function getAllJobs(id) {
      const jobs = await JobDataService.getAllJobs(id);
      setAllJobs(jobs || [])
    }
    getAllJobs(userProfile?.employer?.id)

  }, [])
  return (
    <div className="job_listing_area">
      <ToastContainer autoClose={2000} />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section_title">
              <h3>Posted Job By Me</h3>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="brouse_job text-right">
              <Link className="boxed-btn4" to="/add-job">Add New Job</Link>
            </div>
          </div>
        </div>
        <div className="job_lists">
          <div className="row">
            {allJobs && allJobs.length != 0 && allJobs.map((job, index) => {
              return (
                <div key={index} className="col-lg-12 col-md-12">
                  <div className="single_jobs white-bg d-flex justify-content-between">
                    <div className="jobs_left d-flex align-items-center">
                      <div className="thumb">
                        {job.employer.companyName.charAt(0).toUpperCase()}
                      </div>
                      <div className="jobs_conetent">
                        <Link to={"/job/"+job.id}><h4>{job.title}</h4></Link>
                        <div className="links_locat d-flex align-items-center">
                          <div className="location">
                            <p> <i className="fa fa-map-marker"></i> {job.city}, {job.province} ({job.country})</p>
                          </div>
                          <div className="location">
                            <p> <i className="fa fa-clock-o"></i> {job.jobType}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="jobs_right">
                      <div className="apply_now">
                      <Link to={"/applied-candidate/"+job.id} className="boxed-btn3" style={{marginRight:"10px"}}>View Applied candidates</Link>
                      <Link to={"/job/"+job.id} className="boxed-btn3">Edit Job Details</Link>
                      
                      </div>
                      <div className="date">
                        <p>Created: {new Date(job.created_At).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}


          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeEmployer;