import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./services/store";
import App from './components/app/App';
import './index.css';

const root = document.getElementById("root");
if (root) {
    ReactDOM
        .createRoot(root)
        .render(
            <React.StrictMode>
                <BrowserRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>
            </React.StrictMode>
        );
} else {
    throw new Error("Failed to find the root element");
}
