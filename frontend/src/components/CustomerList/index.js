import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import { useDataContext } from "../../context/DataContext";
import axios from "axios";

function CustomerList({ customers }) {
    const { getCustomers } = useDataContext();
    const handleDelete = (customerId) => {
        axios
            .delete(
                `https://ecommerceappbackend.azurewebsites.net/api/customers/${customerId}`
            )
            .then(() => {
                getCustomers();
            });
    };
    if (customers) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell align="right">
                                Customer Surname
                            </TableCell>
                            <TableCell align="right">E mail</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {customer.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {customer.surname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {customer.email}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            handleDelete(customer.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <CircularProgress />;
    }
}

export default CustomerList;
