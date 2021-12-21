import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useDataContext } from "../context/DataContext";

function CustomerForm({ nextStep, customer }) {
    const { order, getOrderFromLocalStorage, getCustomerById } =
        useDataContext();
    useEffect(() => {
        getOrderFromLocalStorage().then(() => {
            if (order) {
                getCustomerById(order.customerId);
            }
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            id: customer ? customer.id : "",
            name: customer ? customer.name : "",
            surname: customer ? customer.surname : "",
            adress: customer ? customer.adress : "",
            email: customer ? customer.email : "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Enter your name"),
            surname: Yup.string().required("Enter your surname"),
            adress: Yup.string().required("Enter your address"),
        }),
        onSubmit: (values) => {
            //     postCustomer(values).then(() => {
            //         nextStep();
            //     });
            // }, // this part not working. I don't know
            nextStep();
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            {customer && customer.id}
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.name &&
                        Boolean(formik.errors.name) &&
                        "is-invalid"
                    }
                    helpertext={formik.touched.name && formik.errors.name}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                    type="text"
                    id="surname"
                    placeholder="Enter Surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.surname &&
                        Boolean(formik.errors.surname) &&
                        "is-invalid"
                    }
                    helpertext={formik.touched.surname && formik.errors.surname}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    id="adress"
                    placeholder="Enter Address"
                    value={formik.values.adress}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.adress &&
                        Boolean(formik.errors.adress) &&
                        "is-invalid"
                    }
                    helpertext={formik.touched.adress && formik.errors.adress}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.email &&
                        Boolean(formik.errors.email) &&
                        "is-invalid"
                    }
                    helpertext={formik.touched.email && formik.errors.email}
                />
            </Form.Group>
            <Button
                type="submit"
                variant="primary"
                disabled={!formik.dirty || formik.isSubmitting}
            >
                Next
            </Button>
        </Form>
    );
}

export default CustomerForm;
