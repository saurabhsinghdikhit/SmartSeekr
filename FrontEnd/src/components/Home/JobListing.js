import Category from "../../components/Home/Category";
import JobDataService from "../../api/job-services";
import { Link,useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
function JobListing() {
  const [topJobs, setTopJobs] = useState([]);
  const { companyId } = useParams();
  const { search } = useParams();
  
  useEffect(() => {
    async function getAllJob(number) {
        if(companyId==null){
            const allJobs = await JobDataService.getAllJobsByAllCompanies(number);
            setTopJobs(allJobs || [])
            if(search!=null){
              let filterData = allJobs.filter(function (job) {
                return job.title.includes(search)
              });
            setTopJobs(filterData||[]);
            }
            
        }
        else{
            const allJobs = await JobDataService.getAllJobs(companyId);
            setTopJobs(allJobs || [])
            if(search!=null){
              let filterData = allJobs.filter(function (job) {
                return job.title.toLowerCase().includes(search.toLowerCase())
              });
            setTopJobs(filterData||[]);
            }
        }
        
    }
    getAllJob(0)
  }, [companyId,search])
    return(
      <>
      <Category/>
        <div className="job_listing_area" style={{paddingTop:"5px"}}>
        <div className="container">
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
            {topJobs && topJobs.length == 0 && <div><h1>No job available for this company.</h1></div>}
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default JobListing;