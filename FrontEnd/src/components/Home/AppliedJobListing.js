import JobDataService from "../../api/job-services";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AppliedJobListing() {
  const [topJobs, setTopJobs] = useState([]);
  const items = JSON.parse(localStorage.getItem('userData'));
  let userProfile = {};
  if (Object.keys(userProfile).length <= 0)
      userProfile = items;

  useEffect(() => {
    async function getAllJob() {
      const allJobs = await JobDataService.getAppliedJobs(userProfile?.id);
      setTopJobs(allJobs || [])
    }
    getAllJob()
  }, [])
    return(
      <>
        <div className="job_listing_area" style={{paddingTop:"5px"}}>
        <div className="container">
          <div className="job_lists">
            <div className="row">
            {topJobs && topJobs.length != 0 && topJobs.map((appliedJob, index) => {
              return (
                <div key={index} className="col-lg-12 col-md-12">
                <div className="single_jobs white-bg d-flex justify-content-between">
                  <div className="jobs_left d-flex align-items-center">
                    <div className="thumb">
                    {appliedJob.employer.companyName.charAt(0).toUpperCase()}
                    </div>
                    <div className="jobs_conetent">
                    <Link to={"/jobDetails/"+appliedJob.id}><h4>{appliedJob.title}</h4></Link>
                      <div className="links_locat d-flex align-items-center">
                        <div className="location">
                          <p> <i className="fa fa-map-marker"></i> {appliedJob.city}, {appliedJob.province} ({appliedJob.country})</p>
                        </div>
                        <div className="location">
                          <p> <i className="fa fa-clock-o"></i> {appliedJob.jobType}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="jobs_right">
                    {/* <div className="apply_now">
                      <Link className="boxed-btn3" to={"/jobDetails/"+job.id}>Apply Now</Link>
                    </div> */}
                    <div className="date">
                      {/* <p>Applied On: {new Date(appliedJob.appliedOn).toLocaleDateString()}</p> */}
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
            {topJobs && topJobs.length == 0 && <div><h1>you have not applies to any jobs.</h1></div>}
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default AppliedJobListing;