import JobDataService from "../../api/job-services";
import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
function TopJobListing() {
  const topJobsNumber = 4;
  const [topJobs, setTopJobs] = useState([]);
  useEffect(() => {
    async function getAllJob(number) {
      const allJobs = await JobDataService.getAllJobsByAllCompanies(number);
      setTopJobs(allJobs || [])
    }
    getAllJob(topJobsNumber)
  }, [])
    return(
        <div className="job_listing_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section_title">
                <h3>Job Listing</h3>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="brouse_job text-right">
              <Link to={"/all-jobs"} className="boxed-btn4">Browse More Job</Link>
              </div>
            </div>
          </div>
          <div className="job_lists">
            <div className="row">
            {topJobs && topJobs.length != 0 && topJobs.map((job, index) => {
              return (
                <div key={index} className="col-lg-12 col-md-12">
                <div className="single_jobs white-bg d-flex justify-content-between">
                  <div className="jobs_left d-flex align-items-center">
                    <div className="thumb">
                    {job.employer.companyName.charAt(0).toUpperCase()}
                    </div>
                    <div className="jobs_conetent">
                    <Link to={"/jobDetails/"+job.id}><h4>{job.title}</h4></Link>
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
                      <Link className="boxed-btn3" to={"/jobDetails/"+job.id}>Apply Now</Link>
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

export default TopJobListing;