import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useDataContext } from "../../context/DataContext";
import { Container, Nav, Navbar } from "react-bootstrap";

function Navigationbar() {
    const [searchText, setSearchText] = useState("");
    const [newOrderList, setNewOrderList] = useState();
    const { orderListById } = useDataContext();
    useEffect(() => {
        setNewOrderList(orderListById);
    }, [orderListById]);
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand>
                    <Link
                        to="/"
                        className="text-decoration-none text-secondary"
                    >
                        EcommerceSite
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 me-auto d-flex align-items-center">
                        <Nav.Link className="w-100 d-flex me-5 justify-content-center">
                            <div className="w-75 me-5 input-group ">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Search any product"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <Link
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    to={`products/${searchText}`}
                                    onClick={() => setSearchText("")}
                                >
                                    Search
                                </Link>
                            </div>
                        </Nav.Link>
                        <Nav.Link className="w-25 d-flex align-items-center">
                            <Link
                                className="nav-link text-center"
                                aria-current="page"
                                to="/login"
                            >
                                <LoginOutlinedIcon />
                                Login as Admin
                            </Link>
                        </Nav.Link>
                        <Nav.Link className="d-flex justify-content-center">
                            <Link
                                className="nav-link text-center position-relative"
                                aria-current="page"
                                to="/basket"
                            >
                                {newOrderList && newOrderList.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {newOrderList.length}
                                    </span>
                                )}
                                <LocalGroceryStoreOutlinedIcon />
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;
