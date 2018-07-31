import React, { Component } from "react"
import APIManager from "./APIManager"

export default class Login extends Component {
    state = {
        userName: " ",
        email: " "
    }
// This will update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log("handleLogin")
        console.log("this.state.username", this.state.userName)
        APIManager.getUserByUserName(this.state.userName)
        .then ((user) => {
            console.log(user[0].id)
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    userName: this.state.userName,
                    email: this.state.email,
                    currentUserId: user[0].id

                })
            )
        }
    )
    }
    render() {
        return (
            <div className="login">
            <form onSubmit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
            <label htmlFor="inputUserName">
            UserName:
            </label>
            <input onChange={this.handleFieldChange} type="text"
            id="userName"
            placeholder="userName"
            required="" autoFocus="" />
            <label htmlFor="inputEmail">
            Email:
            </label>
            <input onChange={this.handleFieldChange} type="email"
            id="email"
            placeholder="Email"
            required="" autoFocus="" />
            <button type ="submit"onClick={() => window.location.reload()
            }>
            Sign In
            </button>
            </form>
            </div>
        
        )
    }
}
