import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import AdminPanelCategory from "./pages/AdminPanel/Category";
import AdminPanelLayout from "./pages/AdminPanel/AdminPanelLayout";
import AdminPanelHome from "./pages/AdminPanel/Home";
import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanelCustomer from "./pages/AdminPanel/Customer";
import AdminPanelOrder from "./pages/AdminPanel/Order";
import AdminPanelProduct from "./pages/AdminPanel/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import CustomerForm from "./components/CustomerForm";
import { useEffect, useState } from "react";
import { useDataContext } from "./context/DataContext";
import ProductDetail from "./pages/ProductDetail";
import Basket from "./pages/Basket";
import Payment from "./pages/Payment";
import CreditCardForm from "./components/CreditCardForm";
function App() {
    const {
        componentInit,
        getOrderFromLocalStorage,
        order,
        getOrderListById,
        getCustomerById,
        customer,
    } = useDataContext();
    useEffect(() => {
        componentInit();
        getOrderFromLocalStorage().then(() => {
            if (order) {
                getOrderListById(order.id).then(() => {
                    getCustomerById(order.customerId);
                });
            }
        });
    }, []);
    const [activeStep, setActiveStep] = useState(0);
    const nextStep = () => {
        setActiveStep((prevState) => prevState + 1);
    };
    const prevStep = () => {
        setActiveStep((prevState) => prevState - 1);
    };
    const paymentChildrens = [
        <CustomerForm nextStep={nextStep} customer={customer} />,
        <CreditCardForm prevStep={prevStep} nextStep={nextStep} />,
    ];

    return (
        <>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/*" element={<Layout />}>
                        <Route path="" exact element={<HomePage />} />
                        <Route
                            path="products/:searchParam"
                            element={<Products />}
                        />
                        <Route
                            path="product/:productId"
                            element={<ProductDetail />}
                        />
                        <Route path="basket" element={<Basket />} />
                        <Route
                            path="payment"
                            element={
                                <Payment
                                    activeStep={activeStep}
                                    childrens={paymentChildrens}
                                />
                            }
                        />
                    </Route>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route path="/admin-panel/*" element={<AdminPanelLayout />}>
                        <Route
                            path=""
                            exact
                            element={<AdminPanelHome children={<HomePage />} />}
                        />
                        <Route
                            path="category"
                            element={<AdminPanelCategory />}
                        />
                        <Route
                            path="customer"
                            element={<AdminPanelCustomer />}
                        />
                        <Route path="product" element={<AdminPanelProduct />} />
                        <Route path="order" element={<AdminPanelOrder />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
