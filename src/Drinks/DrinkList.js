import React, { Component } from "react";
import Drink from "./Drink";
import Database from "../APIManager";
import { FormControl, FormGroup } from "react-bootstrap";

export default class DrinkList extends Component {
  state = {
    drinks: [],
    drinkToEdit: {},
    showAddDrinkForm: false
  };
  // Here, my DOM is being set up with the data from 'state'.
  // I'm essentially setting state.
  componentDidMount() {
    Database.getAllDrinks().then(drinks => {
      this.setState({ drinks: drinks });
    });
  }

  handleEditADrink = (drinkId, drinkToEdit) => {
    return Database.updateOneDrink(drinkId, drinkToEdit)
      .then(() => {
        return Database.getAllDrinks();
      })
      .then(drinks => {
        this.setState({ drinks: drinks });
      });
  };

  // This function enables me to input new drink details and
  // then prepare to change state with the new drink.
  drinkFormInput = drink => {
    const stateToChange = {};
    stateToChange[drink.target.id] = drink.target.value;
    this.setState(stateToChange);
    showAddDrinkForm: false
  };
  // This code gets the username data so React will have a way
  // to know which user each drink belongs to.
  getUserNameByUserId = userId => {
    Database.getUserNameByUserId(userId).then(userName =>
      this.setState({ drink: userName })
    );
  };
  // Now I need code to add a drink to the database
  addDrink = drink => {
    drink.preventDefault();
    const newObject = {
      DrinkName: this.state.DrinkName,
      DrinkLiquor: this.state.DrinkLiquor,
      DrinkMixer: this.state.DrinkMixer,
      DrinkInstructions: this.state.DrinkInstructions,
      userId: Database.getIdOfCurrentUser(),
      showAddDrinkForm:true
    };
    console.log(drink.target)
    const allInputs=document.querySelectorAll("#drinkForm input")
    console.log(allInputs)
    allInputs.forEach(input => {
        input.value=""
    })
    


    Database.addDrink(newObject).then(DrinkList => {
      this.setState({ drinks: DrinkList });
    });
    console.log("newObject", newObject);    
  };
  
  deleteDrink = drinkId => {
    Database.deleteDrink(drinkId)
      // console.log("drinkId", drinkId)
      .then(deletedDrink => this.setState({ drinks: deletedDrink }));
  };

  // I need to build the form for the user to add a new drink
  render() {
     return (

      <div 
      
      className="drink">
    
         <button type="submit">Add New Drink</button>
         
        {/* //  {/* I need to conditionally render this form based on whether 
        // or not the 'Add New Drink' button has been clicked. If it has been
        // clicked, render the form. If it has not been clicked, render only
        // the list of drinks */} 
         

        <form id="drinkForm" onSubmit={this.addDrink.bind(this)}>
          <h1 id="drink-name" className="h3 mb-3 font-weight-normal">
            My Drinks
          </h1>
          <label htmlFor="DrinkName">Drink Name:</label>
          <FormGroup>
            <FormControl
              onChange={this.drinkFormInput}
              type="text"
              id="DrinkName"
              placeholder="Enter Drink Name"
              ref="DrinkName"
              required=""
              autoFocus=""
            />
          </FormGroup>
          <label htmlFor="DrinkLiquor">Drink Liquors:</label>
          <FormGroup>
            <FormControl
              onChange={this.drinkFormInput}
              type="text"
              id="DrinkLiquor"
              placeholder="Enter Drink Liquors"
              ref="DrinkLiquor"
              required=""
              autoFocus=""
            />
          </FormGroup>
          <label htmlFor="DrinkMixer">Drink Mixers:</label>
          <FormGroup>
            <FormControl
              onChange={this.drinkFormInput}
              type="text"
              id="DrinkMixer"
              placeholder="Enter Drink Mixers"
              ref="DrinkMixer"
              required=""
              autoFocus=""
            />
          </FormGroup>
          <label htmlFor="DrinkInstructions">Drink Instructions:</label>
          <FormGroup>
            <FormControl
              onChange={this.drinkFormInput}
              type="text"
              id="DrinkInstructions"
              placeholder="Enter Drink Instructions"
              ref="DrinkInstructions"
              required=""
              autoFocus=""
            />
          </FormGroup>
          <button type="submit">Save Drink</button>
        </form>
        {this.state.drinks.map(drink => (
          <Drink
            key={drink.id}
            drink={drink}
            EditDrink={this.EditDrink}
            drink={drink}
            deleteDrink={this.deleteDrink}
            drink={drink}
            handleEditADrink={this.handleEditADrink}
          />
        ))}
      </div>
    );
  }
}
