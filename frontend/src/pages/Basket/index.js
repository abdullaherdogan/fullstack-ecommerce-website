import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductOfBasket from "../../components/ProductOfBasket";
import { useDataContext } from "../../context/DataContext";

function Basket() {
    const { orderListById, getOrderFromLocalStorage, getOrderListById, order } =
        useDataContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [summaryList, setSummaryList] = useState([]);
    useEffect(() => {
        getOrderFromLocalStorage().then(() => {
            if (order) {
                getOrderListById(order.id);
            }
        });
    }, []);

    if (orderListById) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <Row xs={1} md={3} className="g-4 my-2">
                            {orderListById.map((orderProduct) => (
                                <Col key={orderProduct.productId}>
                                    <ProductOfBasket
                                        order={orderProduct}
                                        setTotalPrice={setTotalPrice}
                                        setSummaryList={setSummaryList}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="col-12 col-md-4">
                        {summaryList.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {summaryList &&
                                        summaryList.map((summary) => (
                                            <tr>
                                                <td>{summary.name}</td>
                                                <td>{summary.quantity}</td>
                                                <td>{summary.price}₺</td>
                                            </tr>
                                        ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">Total Price</td>
                                        <td>{totalPrice}₺</td>
                                    </tr>
                                    <Link to="/payment">
                                        <button className="mt-2 btn btn-outline-success">
                                            Confirm Cart
                                        </button>
                                    </Link>
                                </tfoot>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
}

export default Basket;
