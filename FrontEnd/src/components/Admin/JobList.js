import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminContext } from './AdminContext';

function Joblist() {
    
    const { isAdminAuthenticated, setIsAdminAuthenticated } = useAdminContext();
    const [jobs, setJobs] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {

        if (!isAdminAuthenticated) {
            navigate('/admin/');
        }

    }, [isAdminAuthenticated]);


    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + 'Job/GetAllJobsByAllCompanies/0') 
            .then(response => response.json())
            .then(data => setJobs(data.result))
            .catch(error => console.error('Error fetching job data:', error));
    }, []);

    return (
        <>
            <div className="row" style={{ minHeight: "550px" }}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Job List</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Salary</th>
                                    <th>City</th>
                                    <th>Province</th>
                                    <th>Country</th>
                                    <th>Job Type</th>
                                    <th>Employer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job => (
                                    <tr key={job.id}>
                                        <td>{job.title}</td>
                                        <td>{job.description}</td>
                                        <td>{job.salary}</td>
                                        <td>{job.city}</td>
                                        <td>{job.province}</td>
                                        <td>{job.country}</td>
                                        <td>{job.jobType}</td>
                                        <td>{job.employer.companyName}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Joblist