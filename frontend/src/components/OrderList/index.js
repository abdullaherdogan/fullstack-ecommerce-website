import React, { useEffect } from "react";
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
import ProductTableRow from "../ProductTableRow";

function OrderList({ order }) {
    const { getOrderListById, orderListById } = useDataContext();
    useEffect(() => {
        getOrderListById(order.id);
    }, []);
    if (order) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderListById &&
                            orderListById.map((order) => (
                                <ProductTableRow
                                    key={order.productId}
                                    productId={order.productId}
                                    quantity={order.quantity}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <CircularProgress />;
    }
}

export default OrderList;
