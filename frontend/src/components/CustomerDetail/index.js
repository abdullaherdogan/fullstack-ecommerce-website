import React from "react";

function CustomerDetail({ customer }) {
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="card-body">
                        <h5 className="card-title">
                            Customer Name: {customer.name}
                        </h5>
                        <p className="card-text">Address: {customer.adress}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                Email: {customer.email}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
