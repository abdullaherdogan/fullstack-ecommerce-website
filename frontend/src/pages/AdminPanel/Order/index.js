import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomerDetail from "../../../components/CustomerDetail";
import OrderList from "../../../components/OrderList";
import PageHeader from "../../../components/PageHeader";
import { useDataContext } from "../../../context/DataContext";

function AdminPanelOrder() {
    const {
        customers,
        getOrdersByCustomer,
        ordersByCustomer,
        getCustomerById,
        customer,
    } = useDataContext();
    const [customerId, setCustomerId] = useState();
    useEffect(() => {
        getOrdersByCustomer(customerId);
        getCustomerById(customerId);
    }, [customerId]);
    return (
        <div>
            <PageHeader title="Order" subtitle="Order Operations" />
            <TextField
                margin="normal"
                select
                label="Customers"
                fullWidth
                id="customerId"
                onChange={(e) => setCustomerId(e.target.value)}
            >
                {customers &&
                    customers.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
            </TextField>
            {customer && <CustomerDetail customer={customer} />}
            {ordersByCustomer && <OrderList order={ordersByCustomer} />}
        </div>
    );
}

export default AdminPanelOrder;
