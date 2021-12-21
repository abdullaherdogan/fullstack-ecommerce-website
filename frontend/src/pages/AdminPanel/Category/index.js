import { Fab, Grid, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import CategoryForm from "../../../components/CategoryForm";
import PageHeader from "../../../components/PageHeader";
import Popup from "../../../components/Popup";
import { useDataContext } from "../../../context/DataContext";
import "./Category.css";
import CategoryList from "../../../components/CategoryList";
function AdminPanelCategory() {
    const { categories } = useDataContext();
    const [openPopup, setOpenPopup] = useState(false);
    const [category, setCategory] = useState();
    return (
        <div>
            <PageHeader title="Category" subtitle="Category Operations" />
            <Tooltip title="Add New Category">
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
                title="Category Operation"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                setCategory={setCategory}
                children={
                    <CategoryForm
                        setOpenPopup={setOpenPopup}
                        category={category}
                    />
                }
            />
            <Grid container spacing={2}>
                <Grid item sm={10} xs={12}>
                    <Paper className="categoryListWrapper">
                        <CategoryList
                            categories={categories}
                            setCategory={setCategory}
                            setOpenPopup={setOpenPopup}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={2} xs={12}></Grid>
            </Grid>
        </div>
    );
}

export default AdminPanelCategory;
