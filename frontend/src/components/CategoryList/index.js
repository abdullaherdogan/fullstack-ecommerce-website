import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, CircularProgress, IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import { useDataContext } from "../../context/DataContext";
function CategoryList({ categories, setCategory, setOpenPopup }) {
    const { getCategories } = useDataContext();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    // Operations
    const handleEdit = (category) => {
        setCategory(category);
        setOpenPopup(true);
    };
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleDelete = (categoryId) => {
        axios
            .delete(
                `https://ecommerceappbackend.azurewebsites.net/api/categories/${categoryId}`
            )
            .then(() => {
                // get categories for refresh the list
                getCategories();
                handleSnackbarOpen();
            });
    };

    if (categories) {
        return (
            <TableContainer component={Paper}>
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
                        Category Deleted
                    </Alert>
                </Snackbar>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow
                                key={cat.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {cat.name}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleEdit(cat)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(cat.id)}
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
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }
}

export default CategoryList;
