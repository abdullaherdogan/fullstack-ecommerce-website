import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCardList from "../../components/ProductCardList";
import { useDataContext } from "../../context/DataContext";
function Products() {
    const { searchParam } = useParams();
    const {
        products,
        filteredProducts,
        setFilteredProducts,
        getProductsByCategory,
    } = useDataContext();
    useEffect(() => {
        if (Number(searchParam)) {
            getProductsByCategory(searchParam);
        } else {
            setFilteredProducts(
                products.filter((product) => {
                    return product.name
                        .toLowerCase()
                        .includes(searchParam.toLowerCase());
                })
            );
        }
    }, []);
    if (filteredProducts && filteredProducts.length > 0) {
        return <ProductCardList products={filteredProducts} />;
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                No Match Data
            </div>
        );
    }
}

export default Products;
