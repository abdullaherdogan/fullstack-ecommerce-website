import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormControl,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useDataContext } from "../context/DataContext";
function ProductForm({ product, setOpenPopup, categories }) {
    const { postProduct } = useDataContext();

    // Formik
    const formik = useFormik({
        initialValues: {
            id: product ? product.id : null,
            categoryId: product ? product.categoryId : 1,
            name: product ? product.name : "",
            description: product ? product.description : "",
            imageUrl: product ? product.imageUrl : "",
            price: product ? product.price : "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Enter a product name"),
            description: Yup.string().required("Enter a description"),
            imageUrl: Yup.string().required("Enter a image url"),
            price: Yup.number().required("Enter a price"),
        }),
        onSubmit: (values, { resetForm, setSubmitting }) => {
            postProduct(values).then(() => {
                resetForm();
                setSubmitting(false);
                setOpenPopup(false);
            });
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="product-form">
                <Typography variant="h5" className="formItem title">
                    Product
                </Typography>
                <TextField
                    label="Product Name"
                    margin="normal"
                    type="text"
                    id="name"
                    fullWidth
                    className="formItem"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    margin="normal"
                    label="Product Description"
                    type="text"
                    id="description"
                    fullWidth
                    className="formItem"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                />
                <TextField
                    margin="normal"
                    label="Image URL"
                    type="text"
                    id="imageUrl"
                    fullWidth
                    className="formItem"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.imageUrl &&
                        Boolean(formik.errors.imageUrl)
                    }
                    helperText={
                        formik.touched.imageUrl && formik.errors.imageUrl
                    }
                />
                <TextField
                    margin="normal"
                    label="Price"
                    type="number"
                    id="price"
                    fullWidth
                    className="formItem"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
                <FormControl fullWidth>
                    <TextField
                        margin="normal"
                        select
                        label="Category"
                        error={
                            formik.touched.categoryId &&
                            Boolean(formik.errors.categoryId)
                        }
                        helperText={
                            formik.touched.categoryId &&
                            formik.errors.categoryId
                        }
                        id="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange("categoryId")}
                    >
                        {categories &&
                            categories.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                    </TextField>
                </FormControl>
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

export default ProductForm;
