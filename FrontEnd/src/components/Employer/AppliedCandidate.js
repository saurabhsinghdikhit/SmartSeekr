import JobDataService from "../../api/job-services"
import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';

export default function AppliedCandidate(){
    const { jobId } = useParams();
    const [allUserDetails, setAllUserDetails] = useState([]);
    useEffect(() => {
        async function getAllUsers(id) {
          const allUsers = await JobDataService.getAppliedUsers(id);
          setAllUserDetails(allUsers || [])
        }
        getAllUsers(jobId)
    
      }, [jobId])
    return (
        <div className="job_listing_area">
      <ToastContainer autoClose={2000} />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section_title">
              <h3>Users Applied for this job</h3>
            </div>
          </div>
        </div>
        <div className="job_lists">
          <div className="row">
            {allUserDetails && allUserDetails.length != 0 && allUserDetails.map((user, index) => {
              return (
                <div key={index} className="col-lg-12 col-md-12">
                  <div className="single_jobs white-bg d-flex justify-content-between">
                    <div className="jobs_left d-flex align-items-center">
                      <div className="thumb">
                        {user.employee.firstName.charAt(0).toUpperCase()}
                      </div>
                      <div className="jobs_conetent">
                        <h4>{user.employee.firstName + " "+ user.employee.lastName}</h4>
                        <div className="links_locat d-flex align-items-center">
                          <div className="location">
                            <p> <i className="fa fa-map-marker"></i> {user.email}</p>
                          </div>
                          <div className="location">
                            <p> <i className="fa fa-clock-o"></i> {user.employee.contactNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="jobs_right">
                      <div className="apply_now">
                      <Link to={user.employeeResume?.resumeUrl} className="boxed-btn3">Download Resume</Link>
                      
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