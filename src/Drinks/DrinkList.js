import React, { Component } from "react";
import Drink from "./Drink";
import Database from "../APIManager";
import { FormControl, FormGroup } from "react-bootstrap";
import { Card, Button, CardTitle, CardText } from "reactstrap";


export default class DrinkList extends Component {
  state = {
    drinks: [],
    drinkToEdit: {},
    showAddDrinkForm: false
  };
  // Here, my DOM is being set up with the data from 'state'.
  // I'm essentially setting state.
  //   componentDidMount() {
  //     Database.getAllDrinks().then(drinks => {
  //       this.setState({ drinks: drinks });
  //     });
  //   }

  // I re-wrote the above code because that was causing ALL the drinks to load
  // no matter which user was logged in. I only want a user to see their own drinks.
  componentDidMount() {
    let userId = Database.getIdOfCurrentUser();
    Database.getUserDrink("drinks", userId)
    .then(drinks => {
      this.setState({ drinks: drinks });
    });
  }
  handleEditADrink = (drinkId, drinkToEdit) => {
    return Database.updateOneDrink(drinkId, drinkToEdit)
      .then(() => {
        return Database.getAllDrinks();
      })
      // Added this code because I was getting ALL the drinks after editing
      // a drink and clicking update. I needed to get only that user's drinks
      // and THEN set state. 
      let userId = Database.getIdOfCurrentUser()
      Database.getUserDrink("drinks", userId)
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
    // showAddDrinkForm: false
  };
  // This code gets the username data so React will know which user each drink belongs to.
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
      userId: Database.getIdOfCurrentUser()
      //   showAddDrinkForm:true
    };
    console.log(drink.target);
    const allInputs = document.querySelectorAll("#drinkForm input");
    console.log(allInputs);
    allInputs.forEach(input => {
      input.value = "";
    });

    // Adds the new drink to the database and resets state (state includes the new list of drinks AND the
    // the showAddDrinkForm state of false, so that the add form will no longer show up after the save button is clicked.
    Database.addDrink(newObject)
    .then(DrinkList => {
      // Earlier I was getting ALL drinks after saving a new drink. I needed to get user drinks with
      // userId argument. So I needed the same block of code from 'component did mount' above instead of asking
      // for all drinks like I was previously. This fixed my issue.
      let userId = Database.getIdOfCurrentUser();
    Database.getUserDrink("drinks", userId)
    .then(drinks => {
      this.setState({ drinks: drinks, showAddDrinkForm: false });
    });
    });
    console.log("newObject", newObject);
    
  };
  //   Function for making the add new drink form display
  showAddForm = () =>
    this.setState({
      showAddDrinkForm: true
    });
  // I wrote this function to hide the add drink form which worked, but it didn't allow the new drink to save
  // in the database because it had to be called with the submit button, which lives within the form.
  //   hideAddForm = () =>
  //   this.setState({
  //     showAddDrinkForm: false
  //   });

  
  // Added this code because I was getting ALL the drinks after deleting
      // a drink. I needed to get only that user's drinks after the delete
      // and THEN set state. I was setting state before getting the user's drinks,
      // which returned all drinks.
  deleteDrink = drinkId => {
    Database.deleteDrink(drinkId)
      // console.log("drinkId", drinkId)
      .then(deletedDrink => 
      {
        let userId = Database.getIdOfCurrentUser()
      Database.getUserDrink("drinks", userId)
      .then(drinks => {
        this.setState({ drinks: drinks });
      });
      }
      );
    };
    
      

  // I need to build the form for the user to add a new drink
  render() {
    return (
      <div className="drink">
        {/* This is the button for adding a new drink; clicking this button changes state and
        displays the 'Add drink form' */}
        <div className="p-3"/>
        <Button color="secondary" type="submit" onClick={this.showAddForm}>
          Add A New Drink
        </Button>
        {this.state.showAddDrinkForm && (
          <form id="drinkForm" onSubmit={this.addDrink.bind(this)}>
            <h1 id="drink-name" className="h3 mb-3 font-weight-normal">
              New Drink
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
            <Button
              type="submit"
              //   onClick={this.hideAddForm}
            >
              Save Drink
            </Button>
            {/* {this.state.showAddDrinkForm} */}
          </form>
        )}

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
