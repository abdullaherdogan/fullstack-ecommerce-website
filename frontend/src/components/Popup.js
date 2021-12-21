import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function Popup({
    title,
    children,
    openPopup,
    setOpenPopup,
    setCategory,
    setProduct,
}) {
    const handleClose = () => {
        setOpenPopup(false);
        // set entities to null for clicked close button.
        // If this operation is not performed, the form fields filled after the editing process.
        if (setCategory) {
            setCategory(null);
        }
        if (setProduct) {
            setProduct(null);
        }
    };
    return (
        <Dialog open={openPopup} maxWidth="md" sx={{ position: "absolute" }}>
            <DialogTitle>
                <div style={{ display: "flex" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <IconButton color="secondary" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
}

export default Popup;
