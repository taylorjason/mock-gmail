import React, { Component } from 'react';
import Search from './Search';
import { EmailContext } from './EmailContext';

export default class NavBar extends Component {
  static contextType = EmailContext;

  render() {
    return (
      <nav className="App-nav">
        <h3> Mock Gmail</h3>
        <p>Built with React and not nearly enough brain power</p>
        <button onClick={this.context.handleClick.bind(this, 'ListView')}>
          View All
        </button>
        <button onClick={this.context.handleClick.bind(this, 'Compose')}>
          Compose
        </button>
        <Search />
      </nav>
    );
  }
}
