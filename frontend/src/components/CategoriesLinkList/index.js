import { Link } from "react-router-dom";
import React from "react";
import { useDataContext } from "../../context/DataContext";
import "./CategoryLinkList.css";
function CategoriesLinkList() {
    const { categories } = useDataContext();

    if (categories) {
        return (
            <div className="container mt-3">
                <ul className="list-group list-group-horizontal-md categoryList">
                    {categories.map((cat) => (
                        <li className="listItem" key={cat.id}>
                            <Link
                                className="list-group-item list-group-item-action text-secondary"
                                to={`/products/${cat.id}`}
                            >
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return <div className="spinner-border" role="status"></div>;
    }
}

export default CategoriesLinkList;
