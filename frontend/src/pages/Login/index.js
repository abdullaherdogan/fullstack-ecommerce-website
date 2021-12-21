import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Topbar from "../../components/Topbar";
import { useLoginContext } from "../../context/LoginContext";
import { TextField, Typography, Button } from "@mui/material";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
function LoginPage() {
    const { adminInfo, setAdmin } = useLoginContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            userName: Yup.string().required("Please enter a current username"),
            password: Yup.string().required("Please enter a current password"),
        }),
        onSubmit: (values, { resetForm, setSubmitting }) => {
            if (
                adminInfo.userName === values.userName &&
                adminInfo.password === values.password
            ) {
                resetForm();
                setSubmitting(false);
                setAdmin(true);
                navigate("/admin-panel");
            }
        },
    });
    return (
        <>
            <Topbar title="ECommerceSite" />
            <div className="loginPageWrapper">
                <form onSubmit={formik.handleSubmit} className="loginForm">
                    <Typography variant="h6" className="formItem">
                        Login
                    </Typography>
                    <TextField
                        label="Username"
                        fullWidth
                        type="text"
                        id="userName"
                        className="formItem"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        margin="normal"
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type="text"
                        id="password"
                        className="formItem"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        margin="normal"
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                    />
                    <Button
                        type="submit"
                        margin="normal"
                        className="formItem"
                        disabled={!formik.dirty || formik.isSubmitting}
                        variant="outlined"
                        fullWidth
                    >
                        Log In
                    </Button>
                    <Link to="/" className="text-secondary">
                        Back to Home
                    </Link>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
