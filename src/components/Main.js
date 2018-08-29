import React from 'react';

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

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
  }

  handleChange(event) {
    this.fetchData(this.refs.country.value);
  }

  fetchData(country="gb") {
    let url = `https://randomuser.me/api/?results=15&nat=${country}`;
    fetch(url)
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.results.map(user => (
      {
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        nationality: `${user.nat}`,
        picture: `${user.picture.medium}`
      }
    )))
    .then(contacts => this.setState({
            contacts,
            isLoading: false
        }))
    .catch(error => console.log('Error occured:', error))
  }

  render() {
    const {isLoading, contacts} = this.state;
    return (
      <div>

          <form>
            <label>Search by Country: </label>
            <select ref="country" id="location" onChange={(e) => {this.handleChange();}}>
              <option value='gb'>GB</option>
              <option value='us'>US</option>
              <option value='fr'>FR</option>
              <option value='de'>DE</option>
              <option value='dk'>DK</option>
              <option value='ie'>IE</option>
            </select>
          </form>

          <div className="listContainer">
              {
                  !isLoading && contacts.length > 0 ? contacts.map(contact => {
                      const {username, name, email, nationality, picture} = contact;
                      return <div className="profileContainer" key={username} title={name}>
                          <div className="imgContainer">
                            <img className="userimage" src={picture} alt="user avatar"/>
                          </div>
                          <p className="individualName">{name}:
                            <span className="email"> {email}</span>
                          </p>
                          <p className="location">{nationality}</p>
                      </div>
                  }) : null
              }
          </div>

      </div>
    );
  }
}

export default Main;
