import React from 'react';

class ProofLine extends React.Component {

  constructor(props) {
    super(props);
    var { lineNumber, equation, rule } = props;
    this.state = {
      lineNumber,
      equation,
      rule
    };
  }

  render() {
    return(
      <li class='proof-line'>
        <div class='proof-line__line-number'>{ this.state.lineNumber }</div>
        <div class='proof-line__equation'>{ this.state.equation }</div>
        <div class='proof-line__rule'>{ this.state.rule }</div>
      </li>
    );
  }
}

export default ProofLine;
