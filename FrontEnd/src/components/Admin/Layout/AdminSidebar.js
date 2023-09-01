import { NavLink  } from 'react-router-dom';

function AdminSidebar() {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt=""
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">SmartSeekr Admin</span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Admin
              </a>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >

              <li className="nav-item">
                <NavLink exact to="/admin/dashboard" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Dashboard
                  </p>
                </NavLink>
                
              </li>
              <li className="nav-item">
              <NavLink exact to="/admin/userlist" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-users"></i>
                  <p>
                    Users
                  </p>
                </NavLink>
                
              </li>
              <li className="nav-item">
              <NavLink exact to="/admin/joblist" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-briefcase"></i>
                  <p>
                    Jobs
                  </p>
                </NavLink>
                
              </li>
              <li className="nav-item">
              <NavLink exact to="/admin/employeelist" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-user"></i>
                  <p>
                    Applicant
                  </p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar;