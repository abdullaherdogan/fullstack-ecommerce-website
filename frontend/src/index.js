import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { LoginProvider } from "./context/LoginContext";
import { DataProvider } from "./context/DataContext";
ReactDOM.render(
    <React.StrictMode>
        <LoginProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </LoginProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
