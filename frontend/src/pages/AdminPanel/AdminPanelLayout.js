import React, { useEffect } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/SideBar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";
function AdminPanelLayout() {
    const navigate = useNavigate();
    const { admin } = useLoginContext();
    useEffect(() => {
        if (admin === false) {
            navigate("/login");
        }
    }, []);
    return (
        <span className="adminPanelLayout">
            <Topbar title="AdminPanel" />
            <div className="adminPanelContainer">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </span>
    );
}

export default AdminPanelLayout;
