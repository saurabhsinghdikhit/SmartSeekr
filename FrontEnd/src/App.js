/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageRoutes from './PageRoutes';
import Footer from './components/Footer';
import Header from './components/Header';
import {  Navigate   } from "react-router-dom";

function App() {
  const [userProfileData, setuserProfileData] = useState({});
  const updateUserProfileData = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setuserProfileData(data);
  };
  const logoutUser = () => {
    localStorage.removeItem('userData');
    setuserProfileData({});
    window.location.href = "/"
  };
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="App">

      {!isAdminRoute && (
        <Header
          updateUserProfileData={updateUserProfileData}
          userProfile={userProfileData}
          logoutUser={logoutUser}
        />
      )}
      {/* <SideBar /> */}
      <PageRoutes updateUserProfileData={updateUserProfileData} userProfile={userProfileData} />

      {/* <div className="container body-area">
      </div> */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
