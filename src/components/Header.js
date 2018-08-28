import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Jake Amigo Comment - would be good to see this function working and how you would use it with the comments ive given you and the fetch you created
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Jake amigo comment - Sometimes for small components you dont need to create a component with a class if you are just using the component to render dynamic content - could just be a Const returning JSX

  render() {

    return (
      <div className="header">
        <h1>Amigo Contacts Database</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search by Country: </label>
          <select id="location" onChange={this.handleChange} value={this.state.value}>
            <option value='gb'>gb</option>
            <option value='us'>us</option>
            <option value='fr'>fr</option>
            <option value='de'>de</option>
          </select>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Header;
