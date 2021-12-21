import React from "react";
import PageHeader from "../../../components/PageHeader";

function AdminPanelHome({ children }) {
    return (
        <div>
            <PageHeader title="Home" />
            {children}
        </div>
    );
}

export default AdminPanelHome;
