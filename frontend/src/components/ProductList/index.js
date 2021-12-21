import React, { useState } from "react";
import {
    Avatar,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Snackbar,
    Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDataContext } from "../../context/DataContext";

function ProductList({ setOpenPopup, setProduct, products }) {
    const { getProducts } = useDataContext();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    // Snackbar
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    // Operations
    const handleEdit = (product) => {
        setProduct(product);
        setOpenPopup(true);
    };
    const handleDelete = (productId) => {
        axios
            .delete(
                `https://ecommerceappbackend.azurewebsites.net/api/products/${productId}`
            )
            .then(() => {
                handleSnackbarOpen();
                getProducts();
            });
    };
    if (products) {
        return (
            <div style={{ height: 400, width: "85%" }}>
                <Paper>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert
                            onClose={handleSnackbarClose}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Product Deleted
                        </Alert>
                    </Snackbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products &&
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Avatar
                                                variant="square"
                                                src={product.imageUrl}
                                                alt={product.name}
                                            />
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>
                                            {product.description}
                                        </TableCell>
                                        <TableCell>{product.price}₺</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                    handleEdit(product)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    } else {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }
}

export default ProductList;
