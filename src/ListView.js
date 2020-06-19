import React, { Component } from 'react';
import { EmailContext } from './EmailContext';
import ListItem from './ListItem';

export default class ListView extends Component {
  static contextType = EmailContext;
  render() {
    return (
      <div>
        {this.context.state.listViewEmails.map((email) => (
          <ListItem email={email} key={email.id} />
        ))}
      </div>
    );
  }
}
