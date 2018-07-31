import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
// import App from './App';
import ApplicationViews from "./ApplicationViews"

ReactDOM.render((
    <Router>
        <ApplicationViews />
        </Router>
), document.getElementById("root"));
