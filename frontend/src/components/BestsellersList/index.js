import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDataContext } from "../../context/DataContext";

function BestsellersList({ products, order, alertify }) {
    const { addToBasket } = useDataContext();
    const handleBasket = (product) => {
        if (order) {
            addToBasket(product.id, order.id);
            alertify.success("Product Added to Basket"); // alertify is not working as toastr
        } else {
            addToBasket(product.id);
            alertify.success("Product Added to Basket");
        }
    };
    const [newList, setNewList] = useState([]);
    const createBestSellerArray = () => {
        for (let i = 4; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            setNewList((prev) => [...prev, products[j]]);
        }
    };
    useEffect(() => {
        if (products) {
            createBestSellerArray();
        }
    }, []);
    if (newList) {
        return (
            <div className="container">
                <Row xs={1} md={4} className="g-4 my-2">
                    {newList.map((product) => {
                        const randKey = Math.floor(Math.random() * 1000); //random for key error
                        return (
                            <Col key={randKey + product.name}>
                                <Card className="productCard">
                                    <Card.Img
                                        className="cardImg"
                                        variant="top"
                                        src={product.imageUrl}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.description}
                                        </Card.Text>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleBasket(product)
                                            }
                                        >
                                            Add to Basket
                                        </Button>
                                        <small className="text-muted ms-3">
                                            {product.price}₺
                                        </small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    } else {
        return <div className="spinner-border" role="status"></div>;
    }
}

export default BestsellersList;
