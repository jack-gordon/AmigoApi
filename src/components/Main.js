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

    //Jake Amigo Comment - Although this method is fine it can look untidy with bigger apps - a good alternative would be to create a variable outside the return then an if() statement which checks what you need. 

    // ie:

    // let persons = null;
    // if(this.state.showPersons) {
    //   persons = (
    //     <div>
    //     {
    //       this.state.persons.map((person) => {
    //         return (
    //           <Person name={person.name}></person>
    //         )
    //       })
    //     }
    //     </div>
    //   )
    // }

    // then in your return all you will need to give is the persons variable


    //Also when mapping through something it will always need a key attribute so react can keep track of it - with most apis this is usually an id

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
