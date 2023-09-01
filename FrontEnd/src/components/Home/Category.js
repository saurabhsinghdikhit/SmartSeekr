import { useNavigate,useParams } from "react-router-dom";
function Category() {
  let navigate = useNavigate();
  const { companyId } = useParams();
  function findJob(){
    const search = document.getElementById("search").value;
    let url = "/all-jobs/";
    url+= companyId!=null && companyId!=undefined?companyId:"all";
    if(url!=null && url!=undefined && url!="")
    url +="/"+search;
    navigate(url);
  }
    return(
        <div className="catagory_area">
        <div className="container">
          <div className="row cat_search">
            <div className="col-lg-4 col-md-4">
              <div className="single_input">
                <input type="text" id="search" placeholder="Search job" />
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-4">
              <div className="single_input">
                <select id="location" className="form-select wide" >
                  <option data-display="Location">Location</option>
                  <option value="1">Dhaka</option>
                  <option value="2">Rangpur</option>
                  <option value="4">Sylet</option>
                </select>
              </div>
            </div> */}
            <div className="col-lg-4 col-md-12">
              <div className="job_btn">
                <button onClick={findJob} className="boxed-btn3">Find Jobs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Category;