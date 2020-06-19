import React, { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
import { EmailContext } from './EmailContext';
import ListView from './ListView';
import Compose from './Compose';
import DetailsView from './DetailsView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'ListView',
      detailsViewID: '',
      listView: false,
      composeView: false,
      listViewEmails: [],
      currentSearch: '',
      composeData: {
        recipient: '',
        sender: 'JayDizzle@InTheHouse.co',
        subject: '',
        message: ''
      },
      sendResponse: ''
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
      .then(() => this.setState({ render: 'ListView' }));
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
      .then(() => this.setState({ render: 'ListView' }));
  }

  handleSend() {
    fetch('http://localhost:3001/emails', {
      method: 'POST',
      body: JSON.stringify(this.composeData)
    })
      .then((response) => response.json()) // turn the response into json
      .then((json) => {
        console.log(json);
        this.setState({
          sendResponse: json
        });
      })
      .then(() => this.setState({ render: 'Compose' }));
  }

  handleViewDetails(emailId) {
    this.setState({ detailsViewID: emailId, render: 'detailsView' });
  }
  handleClick(view) {
    this.setState({ render: view });
  }

  _renderSubComp() {
    switch (this.state.render) {
      case 'ListView':
        return <ListView />;
      case 'Compose':
        return <Compose />;
      case 'detailsView':
        return <DetailsView />;
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
            handleClick: this.handleClick.bind(this),
            fetchAllEmail: this.fetchAllEmail.bind(this),
            handleSend: this.handleSend.bind(this),
            handleViewDetails: this.handleViewDetails.bind(this)
          }}
        >
          <header className="">
            <NavBar />
          </header>
          <div className="main">{this._renderSubComp()}</div>
        </EmailContext.Provider>
      </div>
    );
  }
}

export default App;
