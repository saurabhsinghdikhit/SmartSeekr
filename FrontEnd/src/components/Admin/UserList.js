import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminContext } from './AdminContext';

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isAdminAuthenticated, setIsAdminAuthenticated } = useAdminContext();
    let navigate = useNavigate()

    const usersPerPage = 10;


    useEffect(() => {

        if (!isAdminAuthenticated) {
            navigate('/admin/');
        }

    }, [isAdminAuthenticated]);

    useEffect(() => {

        fetch(process.env.REACT_APP_SERVER_URL + 'User/GetUsers')
            .then(response => response.json())
            .then(data => setUsers(data.result))
            .catch(error => toast('Error fetching user data:', error));
    }, []);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    // Open modal and set selected user
    const openModal = user => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="row" style={{ minHeight: "550px" }}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">User List</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10px' }}>#ID</th>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{indexOfFirstUser + index + 1}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className={`badge ${user.userTypeValue === 'Employer' ? 'badge-success' : 'badge-info'}`}>
                                                    {user.userTypeValue}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => openModal(user)}
                                                >
                                                    View Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer clearfix">
                            <ul className="pagination pagination-sm m-0 float-right">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>«</a>
                                </li>
                                {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(index + 1)}>{index + 1}</a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>»</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            {selectedUser && (
                <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedUser.userTypeValue === 'Employer' && (
                                    <div>
                                        <h6>Employer Details</h6>
                                        <ul>
                                            <li>
                                                Company Name: {selectedUser.employer.companyName}
                                            </li>
                                            <li>
                                                Company Email: {selectedUser.employer.companyEmail}
                                            </li>
                                            <li>
                                                Company Phone: {selectedUser.employer.companyNumber}
                                            </li>
                                            <li>
                                                Company Industry: {selectedUser.employer.companyIndustry}
                                            </li>
                                            <li>
                                                Company Description: {selectedUser.employer.companyDescription}
                                            </li>
                                            <li>
                                                Company Address: {selectedUser.employer.address}
                                            </li>
                                            <li>
                                                Company City: {selectedUser.employer.city}
                                            </li>
                                            <li>
                                                Company Province: {selectedUser.employer.province}
                                            </li>
                                            <li>
                                                Company Country: {selectedUser.employer.country}
                                            </li>
                                            <li>
                                                Company Pincode: {selectedUser.employer.pincode}
                                            </li>
                                        </ul>

                                    </div>
                                )}
                                {selectedUser.userTypeValue === 'Applicant' && (
                                    <div>
                                        <h6>Applicant Details</h6>
                                        <ul>
                                            <li>
                                                Name: {selectedUser.employee.firstName} {selectedUser.employee.lastName}
                                            </li>
                                            <li>
                                                Contact Number: {selectedUser.employee.contactNumber ?? "N/A"}
                                            </li>
                                            <li>
                                                DateOfBirth: {new Date(selectedUser.employee.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) ?? "N/A"}
                                            </li>
                                            <li>
                                                Address: {selectedUser.employee.address ?? "N/A"}
                                            </li>
                                            <li>
                                                City: {selectedUser.employee.city ?? "N/A"}
                                            </li>
                                            <li>
                                                Province: {selectedUser.employee.province ?? "N/A"}
                                            </li>
                                            <li>
                                                Country: {selectedUser.employee.country ?? "N/A"}
                                            </li>
                                            <li>
                                                Pincode: {selectedUser.employee.pincode ?? "N/A"}
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>}

        </>
    )
}
export default UserList