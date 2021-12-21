import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import "../Styles/CategoryForm.css";
import { useDataContext } from "../context/DataContext";
function CategoryForm({ setOpenPopup, category }) {
    const { postCategory } = useDataContext();

    // Formik
    const formik = useFormik({
        initialValues: {
            id: category ? category.id : null,
            categoryName: category ? category.name : "",
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required("Enter a category name"),
        }),
        onSubmit: (values, { resetForm, setSubmitting }) => {
            postCategory(values).then(() => {
                resetForm();
                setSubmitting(false);
                setOpenPopup(false);
            });
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="category-form">
                <Typography variant="h5" className="formItem title">
                    Category
                </Typography>
                <TextField
                    label="Category Name"
                    type="text"
                    id="categoryName"
                    fullWidth
                    className="formItem"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                />
                <Button
                    type="submit"
                    className="formItem"
                    disabled={!formik.dirty || formik.isSubmitting}
                    variant="outlined"
                >
                    Save
                </Button>
            </form>
        </>
    );
}

export default CategoryForm;
