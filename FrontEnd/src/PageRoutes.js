import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateJob from './components/Employer/AddJob';
import RegisterPage from './pages/RegisterPage';
import { RouteValidate } from './services/route-validation'
import ProfileForm from './components/Profile/UserProfileForm'
import EmployerProfile from './components/Employer/Employer-Profile';
import AdminLayout from './components/Admin/Layout/AdminLayout';
import Login from './components/Admin/Login';
import UserList from './components/Admin/UserList';
import Dashboard from './components/Admin/dashboard';
import JobListing from './components/Home/JobListing';
import CompanyListing from './components/Home/CompanyListing';
import ApplicantJobDetails from './components/Home/JobDetails';
import AppliedCandidate from './components/Employer/AppliedCandidate';
import AppliedJobListing from './components/Home/AppliedJobListing';
import Employeelist from './components/Admin/EmployeeList';
import Joblist from './components/Admin/JobList';
function PageRoutes({ updateUserProfileData, userProfile }) {
    return (
        <Routes>
            <Route path='/' element={<HomePage userProfile={userProfile} />}></Route>
            <Route path='/add-job' element={<RouteValidate><CreateJob /></RouteValidate>} />
            <Route path='/job/:jobId' element={<RouteValidate><CreateJob /></RouteValidate>} />
            <Route path='/employer-profile' element={<RouteValidate><EmployerProfile /></RouteValidate>} />
            <Route path='/applied-candidate/:jobId' element={<RouteValidate><AppliedCandidate /></RouteValidate>} />
            <Route path='/user-profile' element={<RouteValidate><ProfileForm updateUserProfileData={updateUserProfileData} userProfile={userProfile} /></RouteValidate>} />
            <Route path='/all-jobs/:companyId?/:search?' element={<JobListing />}></Route>
            <Route path='/applied-jobs' element={<AppliedJobListing />}></Route>
            <Route path='/jobDetails/:jobId?' element={<ApplicantJobDetails />}></Route>
            <Route path='/all-companies' element={<CompanyListing />}></Route>
            <Route path='/login' element={<LoginPage updateUserProfileData={updateUserProfileData} />}></Route>
            <Route path='/register' element={<RegisterPage updateUserProfileData={updateUserProfileData} />}></Route>
            <Route path='/admin' element={<Login></Login>}></Route>
            <Route path='/admin/dashboard' element={<AdminLayout content={<Dashboard></Dashboard>} />}>  </Route>
            <Route path='/admin/userlist' element={<AdminLayout content={<UserList />} />}></Route>
            <Route path='/admin/employeelist' element={<AdminLayout content={<Employeelist></Employeelist>} />}></Route>
            <Route path='/admin/joblist' element={<AdminLayout content={<Joblist></Joblist>} />}></Route>
        </Routes>
    )

}
export default PageRoutes;