import React from 'react';

export default function ListItem(props) {
  return (
    <div className="listItem">
      <h3>{props.email.sender}</h3>
      <p>{props.email.subject}</p>
    </div>
  );
}
