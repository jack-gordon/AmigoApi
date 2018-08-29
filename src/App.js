import React, { Component } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import './styles/Header.css';
import './styles/Main.css';

class App extends Component {

  render() {
    return (
      <div>
      <Header></Header>
      <Main></Main>
      </div>
    );
  }
}

export default App;
