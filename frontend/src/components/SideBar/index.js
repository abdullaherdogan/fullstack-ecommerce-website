import React from "react";
import "./Sidebar.css";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Link } from "react-router-dom";
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className="sidebarTitle">Dashboard</div>
                    <ul className="sidebarList">
                        <Link to="/admin-panel">
                            <li className="sidebarListItem">
                                <HomeIcon className="sidebarIcon" /> Home
                            </li>
                        </Link>
                        <Link to="/admin-panel/category">
                            <li className="sidebarListItem">
                                <CategoryIcon className="sidebarIcon" />{" "}
                                Category
                            </li>
                        </Link>
                        <Link to="/admin-panel/product">
                            <li className="sidebarListItem">
                                <StorefrontIcon className="sidebarIcon" />{" "}
                                Product
                            </li>
                        </Link>
                        <Link to="/admin-panel/customer">
                            <li className="sidebarListItem">
                                <GroupIcon className="sidebarIcon" /> Customer
                            </li>
                        </Link>
                        <Link to="/admin-panel/order">
                            <li className="sidebarListItem">
                                <LocalGroceryStoreIcon className="sidebarIcon" />{" "}
                                Order
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
