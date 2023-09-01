import JobDataService from "../../api/job-services";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
function CompanyListing(){
  const topCompaniesByNumber = 0;
  const [topCompanies, setTopCompanies] = useState([]);
  useEffect(() => {
    async function getTopCompanies(number) {
      const allCompanies = await JobDataService.getTopCompanies(number);
      setTopCompanies(allCompanies || [])
    }
    getTopCompanies(topCompaniesByNumber)
  }, [])
    return(
        <div className="top_companies_area">
          <ToastContainer autoClose={2000} />
        <div className="container">
          <div className="row align-items-center mb-40">
            <div className="col-lg-6 col-md-6">
              <div className="section_title">
                <h3>Top Companies</h3>
              </div>
            </div>
          </div>
          <div className="row">
          {topCompanies && topCompanies.length != 0 && topCompanies.map((company, index) => {
            return(
              <div key={index} className="col-lg-4 col-xl-3 col-md-6">
              <div className="single_company">
                <div className="thumb">
                  {company.employer?.companyName?.charAt(0).toUpperCase()}
                </div>
                <Link to={"/all-jobs/" + company.employer?.id}><h3>{company.employer?.companyName}</h3></Link>
                <p>Our Top Companies</p>
              </div>
            </div>
            )
          })}
          </div>
        </div>
      </div>
    )
}

export default CompanyListing;