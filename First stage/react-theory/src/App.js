import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car.js';

class App extends Component {

  state = {
    cars: [
      {name: 'Ford Focus', year: '2018'},
      {name: 'Audi A8', year: '2016'},
      {name: 'Mazda 3', year: '2010'}
    ],
    pageTitle: 'React components',
    showCars: false
  };

  changeTitleHandler = (newTitle) => {
    this.setState({
      pageTitle: newTitle
    });
  };

  // handleInput = (event) => {
  //   this.setState({
  //     pageTitle: event.target.value
  //   })
  // };

  toggleCarsHandler = () => {
    this.setState({
      showCars : !this.state.showCars
    })
  }

  onChangeName = (name, index) => {
    const car = this.state.cars[index];
    car.name = name;
    // const cars = this.state.cars.concat();
    const cars = [...this.state.cars]; // Spred operator
    cars[index] = car;
    this.setState({
      cars // or cars: cars
    });
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat();
    cars.splice(index, 1);

    this.setState({cars})
  }

  render(){
    const divStyle = {
      textAlign: 'center'
    };

    let cars = null;

    if(this.state.showCars){
      cars = this.state.cars.map((car, index) => {
        return (
          <Car
            key={index}
            name={car.name}
            year={car.year}
            onDelete={this.deleteHandler.bind(this, index)}
            onChangeName={event => this.onChangeName(event.target.value, index)}
          />
        )
      }) 
    }

    return (
      <div style={divStyle}>
        <h1>{this.state.pageTitle}</h1>

        <button
          onClick={this.toggleCarsHandler}>
          Toggle cars
        </button>

        <div style={{
          width: '400px',
          margin: 'auto',
          padding: '20px'
        }}>
          { cars }
        </div>
        
      </div>
    );

    // return React.createElement(
    //   'div',
    //   {
    //     className: 'App'
    //   },
    //   React.createElement(
    //     'h1',
    //     null,
    //     'Hello World!'
    //   )
    // )
  }
}

export default App;
