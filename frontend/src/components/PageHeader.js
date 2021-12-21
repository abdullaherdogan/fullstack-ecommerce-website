import { Paper, Typography } from "@mui/material";
import React from "react";
import "../Styles/PageHeader.css";
function PageHeader({ title, subtitle }) {
    return (
        <Paper elevation={0} square>
            <div className="page-header">
                <div className="page-title">
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="subtitle" component="div">
                        {subtitle}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
}

export default PageHeader;
