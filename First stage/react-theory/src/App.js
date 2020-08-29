import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Counter from './Counter/Counter';
import './App.scss';
import Car from './Car/Car';

export const ClickedContext = React.createContext(false);

class App extends Component {

  constructor(props){
    console.log('App Constructor');
    super(props);

    this.state = {
      clicked: false,
      cars: [
        {name: 'Ford Focus', year: 2018},
        {name: 'Audi A8', year: 2016},
        {name: 'Mazda 3', year: 2010}
      ],
      pageTitle: 'React components',
      showCars: false
    }
  }


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

  componentWillMount(){
    console.log('App componentWillMount');
  }

  componentDidMount(){
    console.log('App componentDidMount');
  }



  render(){
    console.log('App Render');
    const divStyle = {
      textAlign: 'center'
    };

    let cars = null;

    if(this.state.showCars){
      cars = this.state.cars.map((car, index) => {
        return (
          <ErrorBoundary key={index}>
          <Car
            name={car.name}
            year={car.year}
            index={index}
            onDelete={this.deleteHandler.bind(this, index)}
            onChangeName={event => this.onChangeName(event.target.value, index)}
          />
          </ErrorBoundary>
        )
      }) 
    }

    return (
      <div className="app" style={divStyle}>
        {/* <h1>{this.state.pageTitle}</h1> */}
        <h1>{this.props.title}</h1>

        <ClickedContext.Provider value={this.state.clicked}>
          <Counter />
        </ClickedContext.Provider>
        

        {/* <hr/> */}

        <button
          style={{marginTop: '20px'}}
          className={'app__btn'}
          onClick={this.toggleCarsHandler}>
          Toggle cars
        </button>

        <button onClick={() => this.setState({clicked: true})}>Change clicked</button>

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
