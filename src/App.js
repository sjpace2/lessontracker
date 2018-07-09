import React, { Component } from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav';


import './App.css';

class App extends Component {
 

  render() {
 


    return (
      <div >

      <Nav/>
      <h1>{ routes }</h1>

      </div>
    );
  }
}

export default App;
