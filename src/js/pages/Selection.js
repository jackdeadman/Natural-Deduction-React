import React from 'react';
import { Link } from 'react-router';

class Selection extends React.Component {
  render() {
    return (
      <div>
        <Link class="button button--dark" to="proof">Start</Link>
      </div>);
  }
}

export default Selection;
