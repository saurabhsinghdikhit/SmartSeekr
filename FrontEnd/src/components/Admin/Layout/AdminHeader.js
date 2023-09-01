import { useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useAdminContext } from '../AdminContext';

function AdminHeader() {
    let navigate = useNavigate();
    const { isAdminAuthenticated, setIsAdminAuthenticated } = useAdminContext();

    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigate('/admin/');
        }
    }, [isAdminAuthenticated]);

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />

            <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css" />

            <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />

            <link rel="stylesheet" href="dist/css/adminlte.min.css" />

            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => { setIsAdminAuthenticated(false) }} data-widget="control-sidebar" data-slide="true" href="#" role="button">
                            <strong>Logout</strong> <b className="fas fa-sign-out"> </b>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminHeader;