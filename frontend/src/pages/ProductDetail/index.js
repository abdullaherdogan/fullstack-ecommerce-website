import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "./ProductDetail.css";
function ProductDetail() {
    const { productId } = useParams();
    const { getProductById, product } = useDataContext();
    useEffect(() => {
        getProductById(productId);
    }, []);
    if (product) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9 mt-5">
                        <div
                            className="card mb-3"
                            style={{ maxWidth: "720px" }}
                        >
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <img
                                        src={product.imageUrl}
                                        className="img-fluid rounded-start"
                                        alt={product.name}
                                    />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {product.name}
                                        </h4>
                                        <p className="card-text">
                                            {product.description}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                {product.price}₺
                                            </small>
                                        </p>
                                        <button className="btn btn-outline-secondary mt-3">
                                            Add to Basket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div className="spinner-border" role="status"></div>;
    }
}

export default ProductDetail;
