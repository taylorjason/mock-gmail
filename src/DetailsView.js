import React, { Component } from 'react';
import { EmailContext } from './EmailContext';

export default class DetailsView extends Component {
  static contextType = EmailContext;
  render() {
    let email = this.context.state.listViewEmails.filter(
      (msg) => msg.id === this.context.state.detailsViewID
    )[0];
    console.log(email);
    return (
      <div>
        <h3>Subject: {email.subject}</h3>
        <br />
        <p>From: {email.sender}</p>
        <br />
        <h4>Message</h4>
        <p>{email.message}</p>
      </div>
    );
  }
}
