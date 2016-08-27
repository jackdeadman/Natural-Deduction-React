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

  handleClick() {
    console.log(this.props);
    this.props.onSelect(this);
  }

  render() {
    console.log(this.props)
    var classname = this.props.selected ? 'proof-line--selected' : '';
    return(
      <li class={`proof-line ${classname}`} onClick={this.handleClick.bind(this)}>
        <div class='proof-line__line-number'>{ this.state.lineNumber }</div>
        <div class='proof-line__equation'>{ this.state.equation }</div>
        <div class='proof-line__rule'>{ this.state.rule }</div>
      </li>
    );
  }
}

export default ProofLine;
