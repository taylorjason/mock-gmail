import React from 'react';
import Search from './Search';

export default function NavBar(props) {
  return (
    <nav className="App-nav">
      <h3> Mock Gmail</h3>
      <p>Built with React and not nearly enough brain power</p>
      <button onClick={props.onClick}>View All</button>
      <button onClick={props.onClick}>View All</button>
      <Search />
    </nav>
  );
}
