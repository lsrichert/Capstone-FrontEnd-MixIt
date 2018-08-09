import React, { Component } from "react"
import APIManager from "./APIManager"
import Database from "./APIManager";
import { Button } from "reactstrap";
import { FormControl, FormGroup } from "react-bootstrap";




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

    addUser = user => {
        user.preventDefault();
        let newUser = {
          userName: this.state.userName,
          email: this.state.email,
          userId: Database.getIdOfCurrentUser(),
        };
        console.log(user.target)  
    
    // Adds the new drink to the database and resets state (state includes the new list of drinks AND the 
    // the showAddDrinkForm state of false, so that the add form will no longer show up after the save button is clicked.

        Database.addUser(newUser).then(user => {
          this.setState({ users: user });
        });
        console.log("newUser", newUser);    
      };
      handleRegister = (e) => {
        e.preventDefault()
        let regUser = {
            userName: this.state.userName,
            email: this.state.email
        }
        Database.addUser(regUser).then(user => {
            this.setState({ users: user });
          });
        
    
    }


    // handleRegisterFieldChange = (evt) => {
    //     const stateToChange = {}
    //     stateToChange[evt.target.id] = evt.target.value
    //     this.setState(stateToChange)
    // }

    handleRegisterUserNameChange = (e) => {
        this.setState({ userName: e.target.value})
    }
    handleRegisterEmailChange = (e) => {
        this.setState({ email: e.target.value})
    }
      
    render() {
        return (
            <div className="loginRegister">
            <form onSubmit={this.handleLogin}>
            <h2 className="h2 mb-3 font-weight-normal">Sign In</h2>
            <FormGroup>
            <label htmlFor="inputUserName">
            UserName:
            </label>
            <input onChange={this.handleFieldChange} type="text"
            id="userName"
            placeholder="Enter Username"
            required="" autoFocus="" />
            <label htmlFor="inputEmail">
            Email:
            </label>
            <input onChange={this.handleFieldChange} type="email"
            id="email"
            placeholder="Enter Email"
            required="" autoFocus="" />
            <Button type ="submit" color="primary" onClick={() => window.location.reload()
            }>
            Log In
            </Button> 
            </FormGroup>
            </form>

            <br></br>
            <form onSubmit={this.handleRegister}>
            <h2 className="h2 mb-3 font-weight-normal">Register</h2>
            <h6 className="h6 mb-3 font-weight-normal">If you are a new user, please register here</h6>
            <label htmlFor="inputUserName">
            UserName:
            </label>
            
            <input onChange={this.handleRegisterUserNameChange} type="text"
            id="userName"
            placeholder="Register Username"
            required="" autoFocus="" />
            <label htmlFor="inputEmail">
            Email:
            </label>

             {/* <input type="email" id="email" value={this.state.email} onChange={this.handleRegisterEmailChange} placeholder="email" /> */}

            <input onChange={this.handleRegisterEmailChange} type="email"
            id="email"
            placeholder="Register Email"
            required="" autoFocus="" />

            
            <Button type ="submit" color="primary" onClick={() => window.location.reload()}>
            Register New User
            </Button>
            
            </form>
            </div>
        
        )
    }
}
