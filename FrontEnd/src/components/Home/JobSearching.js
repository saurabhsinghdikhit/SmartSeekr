import { Link } from "react-router-dom";
function JobSearching(){
    return(
        <div className="job_searcing_wrap overlay">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="searching_text">
                <h3>Looking for a Job?</h3>
                <p>We provide online instant cash loans with quick approval </p>
                <Link to={"/all-jobs"} className="boxed-btn3">Browse Job</Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    )
}

export default JobSearching;