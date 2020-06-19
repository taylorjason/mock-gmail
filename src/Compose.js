import React, { Component } from 'react';
import { EmailContext } from './EmailContext';

export default class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composeData: {
        recipient: '',
        sender: 'JayDizzle@InTheHouse.co',
        subject: '',
        message: ''
      },
      sendResponse: ''
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  static contextType = EmailContext;

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      composeData: { ...this.state.composeData, [name]: value }
    });
  }

  handleSend(event) {
    console.log(
      'handleSend Called with composeData of',
      JSON.stringify(this.state.composeData)
    );
    fetch('http://localhost:3001/send/', {
      method: 'POST',
      body: JSON.stringify(this.composeData)
    })
      .then((response) => response.json()) // turn the response into json
      .then((json) => {
        console.log(json);
        this.setState({
          sendResponse: json
        });
      });
    console.log(this.state.sendResponse);
    event.preventDefault();
  }

  render() {
    if (this.state.sendResponse === '') {
      return (
        <div className="compose">
          <form onSubmit={this.handleSend}>
            <label>
              Recipient:
              <input
                type="text"
                name="recipient"
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Subject:
              <input
                type="text"
                name="subject"
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Message Body:
              <input
                type="text"
                name="message"
                onChange={this.handleInputChange}
              />
            </label>
            <input type="submit" value="Send" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{this.state.sendResponse.status}</h2>
          <p>Message: {this.state.sendResponse.message}</p>
        </div>
      );
    }
  }
}
