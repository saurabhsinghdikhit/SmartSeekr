import JobSearching from "../components/Home/JobSearching";
import PopularCategory from "../components/Home/PopularCategory";
import Testimonial from "../components/Home/Testimonial";
import TopCompanies from "../components/Home/TopCompanies";
import HomeEmployer from "../components/Employer/Home-employer";
import TopJobListing from "../components/Home/TopJobListing";

function HomePage() {
    const userProfile = JSON.parse(localStorage.getItem('userData'));
    return (
        <div className="my-4">
      {(() => {
        if (userProfile && userProfile.userTypeValue === "Employer") {
          return (
            <HomeEmployer></HomeEmployer>
          )
        } else {
            return (
              <>
                
                {/* <PopularCategory></PopularCategory> */}
                <TopJobListing></TopJobListing>
                
                <TopCompanies></TopCompanies>
                <JobSearching></JobSearching>
                {/* <Testimonial></Testimonial> */}
              </>
            )
          }
        })()}
        </div>
    )
}
export default HomePage;