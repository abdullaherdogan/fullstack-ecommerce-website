import React from "react";
import CustomerList from "../../../components/CustomerList";
import PageHeader from "../../../components/PageHeader";
import { useDataContext } from "../../../context/DataContext";

function AdminPanelCustomer() {
    const { customers } = useDataContext();
    return (
        <div>
            <PageHeader title="Customer" subtitle="Customer Operations" />
            <CustomerList customers={customers} />
        </div>
    );
}

export default AdminPanelCustomer;
