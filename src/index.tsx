import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./services/store";
import {App} from './components/app/App';
import './index.css';

const root = document.getElementById("root");
if (!root) {
    throw new Error("Failed to find the root element");
}

ReactDOM
    .createRoot(root)
    .render(
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </HashRouter>
        </React.StrictMode>
    );
