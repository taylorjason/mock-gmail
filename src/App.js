import React, { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
import { EmailContext } from './EmailContext';
import ListView from './ListView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsView: false,
      listView: false,
      composeView: false,
      listViewEmails: [],
      currentSearch: '',
      composeData: {
        recipient: '',
        sender: 'JayDizzle@InTheHouse.co',
        subject: '',
        message: ''
      }
    };
  }
  handleChange(event) {
    this.setState({
      currentSearch: event.target.value
    });
    // console.log(this.state.currentSearch);
  }

  handleSearch(event) {
    console.log('currentSearch: ', this.state.currentSearch);
    if (this.state.currentSearch === '') {
      this.fetchAllEmail();
      return;
    }
    fetch('http://localhost:3001/search/?query=' + this.state.currentSearch)
      .then((response) => response.json()) // turn the response into json
      .then((json) => {
        console.log(json);
        this.setState({
          listViewEmails: json
        });
      })
      .then(() => this.setState({ render: 'viewList' }));
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchAllEmail();
  }

  fetchAllEmail() {
    fetch('http://localhost:3001/emails')
      .then((response) => response.json()) // turn the response into json
      .then((json) => {
        console.log(json);
        this.setState({
          listViewEmails: json,
          currentSearch: ''
        });
      })
      .then(() => this.setState({ render: 'viewList' }));
  }

  _renderSubComp() {
    switch (this.state.render) {
      case 'ListView':
        return <ListView />;
      default:
        return <ListView />;
    }
  }
  render() {
    return (
      <div className="App">
        <EmailContext.Provider
          value={{
            state: this.state,
            handleChange: this.handleChange.bind(this),
            handleSearch: this.handleSearch.bind(this),
            fetchAllEmail: this.fetchAllEmail.bind(this)
          }}
        >
          <header className="">
            <NavBar onClick={this.fetchAllEmail.bind(this)} />
          </header>
          <div className="main">
            <h1> This is the main body area</h1>
            {this._renderSubComp()}
          </div>
        </EmailContext.Provider>
      </div>
    );
  }
}

export default App;
