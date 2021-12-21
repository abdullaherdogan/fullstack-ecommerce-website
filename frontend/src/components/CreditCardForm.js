import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Container } from "@mui/material";

function CreditCardForm({ prevStep }) {
    const formik = useFormik({
        initialValues: {
            nameOnCard: "",
            cardNumber: "",
            expDate: "",
            cvv: "",
            telephone: "",
        },
        validationSchema: Yup.object().shape({
            nameOnCard: Yup.string().required("Please enter name on card"),
            cardNumber: Yup.string().required("Please enter your card number"),
            expDate: Yup.string().required("Please enter expiration date"),
            cvv: Yup.string().required("Please enter cvv number"),
            telephone: Yup.string().required(
                "Please enter your telephone number"
            ),
        }),
        onSubmit: (values) => {},
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name on Card</Form.Label>
                <Form.Control
                    type="text"
                    id="nameOnCard"
                    placeholder="Name on Card"
                    value={formik.values.nameOnCard}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.nameOnCard &&
                        Boolean(formik.errors.nameOnCard) &&
                        "is-invalid"
                    }
                    helpertext={
                        formik.touched.nameOnCard && formik.errors.nameOnCard
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3 w-50 d-inline-block">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                    type="text"
                    id="expDate"
                    placeholder="Expiration Date"
                    value={formik.values.expDate}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.expDate &&
                        Boolean(formik.errors.expDate) &&
                        "is-invalid"
                    }
                    helpertext={formik.touched.expDate && formik.errors.expDate}
                />
            </Form.Group>
            <Form.Group className="mb-3 ms-5 w-25 d-inline-block">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                    type="text"
                    id="cvv"
                    placeholder="CVV"
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.cvv &&
                        Boolean(formik.errors.cvv) &&
                        "is-invalid"
                    }
                    helpertext={formik.touched.cvv && formik.errors.cvv}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    id="telephone"
                    placeholder="Phone Number"
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    className={
                        formik.touched.telephone &&
                        Boolean(formik.errors.telephone) &&
                        "is-invalid"
                    }
                    helpertext={
                        formik.touched.telephone && formik.errors.telephone
                    }
                />
            </Form.Group>
            <Container className="d-flex justify-content-between">
                <Button variant="primary" onClick={prevStep}>
                    Back
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!formik.dirty || formik.isSubmitting}
                >
                    Complete
                </Button>
            </Container>
        </Form>
    );
}

export default CreditCardForm;
