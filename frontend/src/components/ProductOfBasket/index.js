import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDataContext } from "../../context/DataContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
function ProductOfBasket({ order, setTotalPrice, setSummaryList }) {
    const [product, setProduct] = useState();
    const { getOrderListById, orderListById } = useDataContext();
    useEffect(() => {
        if (product) {
            setSummaryList(
                (prevState) =>
                    (prevState = [
                        ...prevState,
                        {
                            name: product.name,
                            price: product.price,
                            quantity: order.quantity,
                        },
                    ])
            );
        }
    }, [orderListById]);
    useEffect(() => {
        axios
            .get(
                `https://ecommerceappbackend.azurewebsites.net/api/products/product/${order.productId}`
            )
            .then((res) => {
                setProduct(res.data);
                setTotalPrice(
                    (prevState) =>
                        prevState + Number(res.data.price) * order.quantity
                );
            });
    }, []);
    const handleDelete = () => {
        axios
            .delete(
                `https://ecommerceappbackend.azurewebsites.net/api/orderproducts/${order.orderId}/${order.productId}`
            )
            .then(() => {
                getOrderListById(order.orderId);
                setSummaryList([]);
            });
    };
    const handleDecrease = () => {
        if (Number(order.quantity) > 1) {
            axios
                .put(
                    "https://ecommerceappbackend.azurewebsites.net/api/orderproducts/quantity-decrease",
                    order
                )
                .then(() => {
                    getOrderListById(order.orderId);
                    setSummaryList([]);
                });
        } else {
            axios
                .delete(
                    `https://ecommerceappbackend.azurewebsites.net/api/orderproducts/${order.orderId}/${order.productId}`
                )
                .then(() => {
                    getOrderListById(order.orderId);
                    setSummaryList([]);
                });
        }
    };
    const handleIncrease = () => {
        axios
            .put(
                "https://ecommerceappbackend.azurewebsites.net/api/orderproducts/quantity-increase",
                order
            )
            .then(() => {
                getOrderListById(order.orderId);
                setSummaryList([]);
            });
    };

    if (product) {
        return (
            <Card>
                <Card.Img
                    className="cardImg"
                    variant="top"
                    src={product.imageUrl}
                />
                <Card.Body className="cardBody">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <div>
                        <div className="align-items-center d-flex flex-row">
                            <RemoveIcon
                                sx={{ cursor: "pointer" }}
                                className="text-secondary"
                                onClick={handleDecrease}
                            />
                            <div className="mx-2">{order.quantity}</div>
                            <AddIcon
                                sx={{ cursor: "pointer" }}
                                className="text-secondary"
                                onClick={handleIncrease}
                            />
                            <IconButton onClick={handleDelete} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <small className="text-muted">
                            TotalPrice:{" "}
                            {Number(product.price) * Number(order.quantity)}₺
                        </small>
                    </div>
                </Card.Body>
            </Card>
        );
    } else {
        return <div className="spinner-border" role="status"></div>;
    }
}

export default ProductOfBasket;
