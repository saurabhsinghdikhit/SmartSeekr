import { Link } from "react-router-dom";
import { React, useEffect, useState } from 'react';
import ProfileForm from "./Profile/UserProfileForm";
import EmployeeeDataService from "../api/employee-services";

function Header({ updateUserProfileData, userProfile, logoutUser }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});
  const items = JSON.parse(localStorage.getItem('userData'));
  if (Object.keys(userProfile).length <= 0)
    userProfile = items;
  const logout = () => {
    logoutUser();
  }
  useEffect(() => {
    async function getUserProfileData(userId) {
      const userProfileData = await EmployeeeDataService.getEmployeeDetails(userId)
      setUserProfileData(userProfileData)
    }
    if (userProfile?.id) {
      getUserProfileData(userProfile.id)
    }
  }, [userProfile?.id])
  return (<header>
    <div className="header-area">
      <div id="sticky-header" className="main-header-area">
        <div className="container-fluid ">
          <div className="header_bottom_border">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2">
                <div className="logo">
                  <Link to={"/"}><img src="img/logo.png" alt="" /></Link>
                 
                </div>
              </div>
              <div className="col-xl-10 col-lg-10">
                <div className="main-menu  d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li><Link to={"/"}>home</Link></li>
                      
                      {userProfile && userProfile.name != "" && userProfile.userTypeValue == "Applicant" &&
                        <>
                        <li><Link to={"/applied-jobs"}>Applied Jobs</Link></li>
                        <li><Link to={"/all-jobs"}>Browse Jobs</Link></li>
                        </>
                        
                      }
                      {/* <li><a href="#">pages <i className="ti-angle-down"></i></a>
                        <ul className="submenu">
                          <li><a href="candidate.html">Candidates </a></li>
                          <li><a href="job_details.html">job details </a></li>
                          <li><a href="elements.html">elements</a></li>
                        </ul>
                      </li> */}
                      {/* <li><a href="#">blog <i className="ti-angle-down"></i></a>
                        <ul className="submenu">
                          <li><a href="blog.html">blog</a></li>
                          <li><a href="single-blog.html">single-blog</a></li>
                        </ul>
                      </li> */}
                      {userProfile && userProfile.name != "" && 
                        <li className="float-right pt-25"><Link to={'/'} className="btn btn-primary" style={{ padding: "10px" }}>{userProfile.name} <i className="ti-angle-down"></i>&nbsp;</Link>
                          <ul className="submenu">
                            <li><Link to={userProfile.userTypeValue == "Employer" ? "employer-profile" : "user-profile"}>Profile</Link></li>
                            <li><Link onClick={logout}>Logout</Link></li>
                          </ul>
                        </li>
                      }
                      {items == null &&
                        <li className="float-right pt-25" style={{ marginLeft: '5px' }}>
                          <Link className="btn btn-primary w-100" to="/login" style={{ padding: "10px" }}>Login</Link>
                        </li>
                        // <div className="phone_num d-none d-xl-block">
                        //   <Link className="boxed-btn3" to="/login">Log in</Link>
                        // </div>
                      }
                      {userProfile && userProfile.userTypeValue == "Employer" &&
                        <li className="float-right pt-25" style={{ marginRight: '5px' }}>
                          <Link className="btn btn-primary w-100" to="/add-job" style={{ padding: "10px" }}>Post a Job</Link>
                        </li>
                        // <div className="d-none d-lg-block">
                        //   <a className="boxed-btn3" href="#">Post a Job</a>
                        // </div>
                      }
                    </ul>
                  </nav>
                </div>
              </div>
              {/* <div className="col-xl-2 col-lg-2 d-none d-lg-block">
                <div className="Appointment">
                  {items == null &&
                    <div className="phone_num d-none d-xl-block">
                      <Link className="boxed-btn3" to="/login">Log in</Link>
                    </div>
                  }
                  {userProfile && userProfile.userTypeValue == "Employer" &&
                    <div className="d-none d-lg-block">
                      <a className="boxed-btn3" href="#">Post a Job</a>
                    </div>
                  }
                </div>
              </div> */}
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    {/* <ProfileForm updateUserProfileData={updateUserProfileData} userProfile={userProfile} isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} userProfileData={userProfileData}></ProfileForm> */}

  </header>)
}
export default Header;