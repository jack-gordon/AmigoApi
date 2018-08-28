import React, { Component } from 'react';

// I wanted to make each component written in its own module located in Components folder
// and import it like below but I could not figure out exactly how data flow works in React

// import Header from './components/Header.js'
// import Main from './components/Main.js'
import './App.css';

let mainApi = 'https://randomuser.me/api/?results=20';
let country = 'gb';
let url = mainApi+'&nat='+country;

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    country = this.state.value;
    url = mainApi+'&nat='+country;
    // logs out the url correctly but I could not figure out how to bind fetchData and fire it to call different nationality
    console.log(url);
  }

  render() {

    return (
      <div className="header">
        <h1>Amigo Contacts Database</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search by Country: </label>
          <select id="location" onChange={this.handleChange} value={this.state.value}>
            <option value='gb'>GB</option>
            <option value='us'>US</option>
            <option value='fr'>FR</option>
            <option value='de'>DE</option>
          </select>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}


class Main extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading: true,
          contacts: []
      }
      this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    fetch(url)
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.results.map(user => (
      {
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        location: `${user.location.city}`,
        picture: `${user.picture.medium}`
      }
    )))
    .then(contacts => this.setState({
            contacts,
            isLoading: false
        }))
    .catch(error => console.log('Error occured:', error))
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
  }

  render() {
    const {isLoading, contacts} = this.state;
    return (
      <div>
          <div className="listContainer">
              {
                  !isLoading && contacts.length > 0 ? contacts.map(contact => {
                      const {username, name, email, location, picture} = contact;
                      return <div className="profileContainer" key={username} title={name}>
                          <div className="imgContainer">
                            <img className="userimage" src={picture} alt="user avatar"/>
                          </div>
                          <p className="individualName">{name}:
                            <span className="email"> {email}</span>
                          </p>
                          <p className="location">{location}</p>
                      </div>
                  }) : null
              }
          </div>
      </div>
    );
  }
}

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
