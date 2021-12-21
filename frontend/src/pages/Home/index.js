import React, { useEffect, useState } from "react";
import BestsellersList from "../../components/BestsellersList";
import HomeCarousel from "../../components/Carousel";
import CategoriesLinkList from "../../components/CategoriesLinkList";
import ProductCardList from "../../components/ProductCardList";
import { useDataContext } from "../../context/DataContext";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.css";
import * as alertify from "alertifyjs";
import Pagination from "../../components/Pagination";

function HomePage() {
    const { products, order, getOrderListById } = useDataContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(8);

    useEffect(() => {
        if (order) {
            getOrderListById(order.id);
        }
    }, [products]);
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts =
        products && products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <CategoriesLinkList />
            <HomeCarousel />
            <div className="container mt-3 border-bottom">
                <h2>Bestsellers</h2>
            </div>
            {products && (
                <BestsellersList
                    products={products}
                    order={order}
                    alertify={alertify}
                />
            )}
            <div className="container mt-3 border-bottom">
                <h2>All Products</h2>
            </div>
            {currentProducts && (
                <ProductCardList
                    products={currentProducts}
                    order={order}
                    alertify={alertify}
                />
            )}
            <div className="container">
                {products && (
                    <Pagination
                        productPerPage={productPerPage}
                        totalProducts={products.length}
                        paginate={paginate}
                    />
                )}
            </div>
        </>
    );
}

export default HomePage;
