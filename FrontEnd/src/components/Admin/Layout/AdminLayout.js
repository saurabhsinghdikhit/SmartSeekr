import { useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";



function AdminLayout({content}) {

    useEffect(() => {
        document.body.classList.add('layout-fixed');
    })

    return (
        <>
            <AdminHeader />
            <AdminSidebar></AdminSidebar>

            <div className="content-wrapper">
                

                <div className="content py-4">
                    <div className="container-fluid">
                        {content}
                    </div>
                </div>
            </div>

            <AdminFooter></AdminFooter>
        </>
    )
}

export default AdminLayout;