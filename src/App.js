import React, { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
import { EmailContext } from './EmailContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsView: false,
      listView: false,
      composeView: false,
      listViewEmails: []
    };
  }
  handleChange(event) {
    this.setState({
      currentSearch: {
        name: event.target.value
      }
    });
  }

  handleSearch(event) {
    console.log('currentSearch: ', this.state.currentSearch.name);
    fetch('https://pokeapi.co/api/v2/pokemon/' + this.state.currentSearch.name)
      .then((response) => response.json()) // turn the response into json
      .then((json) => {
        this.setState({
          currentPokemon: json || { name: this.state.currentSearch.name } //#REFACTOR: Use catch instead
        });
      })
      .then(() => this.setState({ render: 'Search' }));
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <EmailContext.Provider
          value={{
            state: this.state,
            handleChange: this.handleChange.bind(this),
            handleSearch: this.handleSearch.bind(this)
          }}
        >
          <header className="">
            <NavBar />
          </header>
          <div className="main">
            <h1> This is the main body area</h1>
          </div>
        </EmailContext.Provider>
      </div>
    );
  }
}

export default App;
