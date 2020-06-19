import React, { Component } from 'react';
import { EmailContext } from './EmailContext';

export default class ListItem extends Component {
  static contextType = EmailContext;
  render() {
    return (
      <div className="listItem">
        <h3>{this.props.email.sender}</h3>
        <p>{this.props.email.subject}</p>
        {/* <p>{props.email.message.slice(0, 28)}</p> */}
        <button
          onClick={this.context.handleViewDetails.bind(
            this,
            this.props.email.id
          )}
        >
          View
        </button>
      </div>
    );
  }
}
