import React from "react";
import "./Topbar.css";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLoginContext } from "../../context/LoginContext";
import { Link } from "react-router-dom";
function Topbar({ title }) {
    const { admin, setAdmin } = useLoginContext();
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="topbarTitle">{title}</span>
                </div>
                <div className="topRight">
                    <div className="iconContainer">
                        {admin && (
                            <Link to="/login">
                                <Tooltip title="Logout">
                                    <IconButton
                                        onClick={() =>
                                            setAdmin((prevState) => !prevState)
                                        }
                                    >
                                        <LogoutIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
