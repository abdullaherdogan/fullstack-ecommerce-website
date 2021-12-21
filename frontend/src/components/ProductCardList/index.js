import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "./ProductCardList.css";

function ProductCardList({ products, order, alertify }) {
    const { addToBasket, getOrderListById } = useDataContext();
    const handleBasket = (productId) => {
        if (order) {
            addToBasket(productId, order.id);
            alertify.success("Product Added to Basket");
            getOrderListById(order.id);
        } else {
            addToBasket(productId);
            alertify.success("Product Added to Basket");
            getOrderListById(order.id);
        }
    };
    if (products) {
        return (
            <div className="container">
                <Row xs={1} md={4} className="g-4 my-2">
                    {products.map((product) => (
                        <Col key={product.id}>
                            <Card className="productCard">
                                <Link to={`product/${product.id}`}>
                                    <Card.Img
                                        className="cardImg"
                                        variant="top"
                                        src={product.imageUrl}
                                    />
                                </Link>
                                <Card.Body className="cardBody">
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <div>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleBasket(product.id)
                                            }
                                        >
                                            Add to Basket
                                        </Button>
                                        <small className="text-muted ms-3">
                                            {product.price}₺
                                        </small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    } else {
        return <div className="spinner-border" role="status"></div>;
    }
}

export default ProductCardList;
