import React from 'react';

let mainApi = 'https://randomuser.me/api/?results=20';
let country = 'gb';
let url = mainApi+'&nat='+country;

class Main extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          isLoading: true,
          contacts: []
      }
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

export default Main;
