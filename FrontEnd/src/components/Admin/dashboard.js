import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useAdminContext } from './AdminContext';
export default function Dashboard() {
    let navigate = useNavigate();
    const { isAdminAuthenticated, setIsAdminAuthenticated } = useAdminContext();

    console.log(isAdminAuthenticated);


    useEffect(() => {
        if (!isAdminAuthenticated) {
            console.log(isAdminAuthenticated);
            navigate('/admin/');
        }
    }, []);


    return (
        <>
            <div className="row" style={{ minHeight: "550px" }}>
                <div className="col-lg-6 col-6">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>0</h3>
                            <p>Total Jobs</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-tasks"></i>
                        </div>
                        <a href="#" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right"></i>
                        </a>

                    </div>
                </div>

                <div className="col-lg-6 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>0</h3>
                            <p>Users</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add"></i>
                        </div>

                        <NavLink exact to="/admin/userlist" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right"></i>

                        </NavLink>
                    </div>
                </div>

            </div>
        </>
    )

}
