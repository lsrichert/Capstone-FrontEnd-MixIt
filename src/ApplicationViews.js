import { Route } from "react-router-dom"
import React, { Component } from "react"
import App from "./App"
import Login from "./Login"
import "./App.css"

export default class ApplicationViews extends Component {
    isAuthenticated = () => localStorage.getItem("credentials") !== null

    render() {
        return (

            <React.Fragment>
                <Route exact path ="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <App />
                    
                    } else {
                        return <Login{...props}/>
                    }
                }}/>
                <Route path="/App" component={App} />
                </React.Fragment>
        )
    }
}