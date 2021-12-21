import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";

function Payment({ childrens, activeStep }) {
    return (
        <Container className="w-50 mt-4">
            <Stepper activeStep={activeStep}>
                <Step>
                    <StepLabel>Customer Information</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Credit Card</StepLabel>
                </Step>
            </Stepper>
            <Container style={{ minHeight: "400px" }} className="my-3">
                {childrens[activeStep]}
            </Container>
        </Container>
    );
}

export default Payment;
