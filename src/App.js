import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
// import Login from "./Login"
import DrinkList from "./Drinks/DrinkList";
// import CabinetList from "./Cabinet/CabinetList"
import "./index.css";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Login /> */}
        <Header />
        <DrinkList />
      </React.Fragment>

      // {/* // <div className="App">
      // //   <header className="App-header">
      // //     <img src={logo} className="App-logo" alt="logo" />
      // //     <h1 className="App-title">Welcome to React</h1>
      // //   </header>
      // //   <p className="App-intro">
      // //     To get started, edit <code>src/App.js</code> and save to reload.
      // //   </p>
      // // </div> */}
    );
  }
}

export default App;
