import { Avatar, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductTableRow({ productId, quantity }) {
    const [product, setProduct] = useState();
    useEffect(() => {
        axios
            .get(
                `https://ecommerceappbackend.azurewebsites.net/api/products/product/${productId}`
            )
            .then((res) => setProduct(res.data));
    }, []);
    if (product) {
        return (
            <TableRow key={product.id}>
                <TableCell>
                    <Avatar
                        variant="square"
                        src={product.imageUrl}
                        alt={product.name}
                    />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}₺</TableCell>
                <TableCell>{quantity}</TableCell>
            </TableRow>
        );
    } else {
        return <div>loading...</div>;
    }
}

export default ProductTableRow;
