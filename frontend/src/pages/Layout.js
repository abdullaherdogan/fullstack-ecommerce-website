import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "../components/Navbar";

function Layout() {
    return (
        <>
            <Navigationbar />
            <div className="homeWrapper">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
