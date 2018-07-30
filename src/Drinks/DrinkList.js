import React, { Component } from "react"
// import Drink from "Drink"
import Database from "../APIManager"
import { FormControl, FormGroup } from "react-bootstrap";

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
addDrink = (drink) => {
    drink.preventDefault()
    const newObject = {
        DrinkName: this.state.DrinkName,
        DrinkLiquor: this.state.DrinkLiquor,
        DrinkMixer: this.state.DrinkMixer,
        DrinkInstructions: this.state.DrinkInstructions
    }
    Database.addDrink(newObject)
    .then(DrinkList => {
        this.setState({ drinks: DrinkList})
    })

}
// I need to build the form for the user to add a new drink
    render() {
        return (
            <div className="drink">
                <form onSubmit={this.addDrink.bind(this)}>
                    <h1 id="drink-name" className="h3 mb-3 font-weight-normal">Drink List</h1>
                    <label htmlFor="DrinkName">
                        Drink Name:
            </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                            id="DrinkName"
                            placeholder="Drink Name"
                            required="" autoFocus="" />
                    </FormGroup>
                    <label htmlFor="DrinkLiquor">
                        Drink Liquors:
            </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                            id="DrinkLiquor"
                            placeholder="Drink Liquors"
                            required="" />
                    </FormGroup>
                    <label htmlFor="DrinkMixer">
                    Drink Mixers:
                    </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                        id="DrinkMixer"
                        placeholder="Drink Mixers"
                        required="" />
                        </FormGroup>
                    <label htmlFor="DrinkInstructions">
                    Drink Instructions:
                    </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                        id="DrinkInstructions"
                        placeholder="Drink Instructions"
                        required="" />
                        </FormGroup>
                        <button type="submit">
                        Add Drink
                        </button>
                        </form>
                        </div>

                    )
                }
                }
                
                
                
                
                
