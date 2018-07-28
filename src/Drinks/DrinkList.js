import React, { Component } from "react"
import Drink from "./Drinks"
import { FormControl, FormGroup } from "../../node_modules/react-bootstrap";

export default class DrinkList extends Component {
    state = {
        drinks: []
    }
// Here, my DOM is being set up with the data from 'state'. 
// I'm essentially setting state.
componentDidMount() {
    Database.getAllDrinks()
    .then(drinks => {
        this.setState({ drinks: drinks })
    })
}
// This function enables me to input new drink details and 
// then prepare to change state with the new drink.
drinkFormInput = (drink) => {
    const stateToChange = {}
    stateToChange[drink.target.id] = drink.target.value
    this.setState(stateToChange)
}
// This code gets the username data so React will have a way
// to know which user each drink belongs to.
getUserNameByUserId = (userId) => {
    Database.getUserNameByUserId(userId)
    .then(userName => this.setState({ drink: userName}))
}
// Now I need code to add a drink to the database
}





