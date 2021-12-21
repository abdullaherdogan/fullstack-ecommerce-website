import { Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import Popup from "../../../components/Popup";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "../../../components/ProductForm";
import { useDataContext } from "../../../context/DataContext";
import ProductList from "../../../components/ProductList";

function AdminPanelProduct() {
    const [openPopup, setOpenPopup] = useState(false);
    const [product, setProduct] = useState();
    const { categories, products } = useDataContext();
    return (
        <div>
            <PageHeader title="Product" subtitle="Product Operations" />
            <Tooltip title="Add New Product">
                <Fab
                    className="addButton"
                    color="primary"
                    size="medium"
                    onClick={() => setOpenPopup(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Popup
                title="Product Operation"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                setProduct={setProduct}
                children={
                    <ProductForm
                        categories={categories}
                        setOpenPopup={setOpenPopup}
                        product={product}
                    />
                }
            />
            <ProductList
                products={products}
                setOpenPopup={setOpenPopup}
                setProduct={setProduct}
            />
        </div>
    );
}

export default AdminPanelProduct;
