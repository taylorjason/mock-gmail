import React from 'react';
import { EmailContext } from './EmailContext';

class Search extends React.Component {
  static contextType = EmailContext;
  render() {
    return (
      <div className="Search">
        <form onSubmit={this.context.handleSearch}>
          <label>
            Search:
            <input
              type="text"
              name="name"
              onChange={this.context.handleChange}
              value={this.context.state.currentSearch}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default Search;
