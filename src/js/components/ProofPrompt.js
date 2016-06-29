import React from 'react';

class ProofPrompt extends React.Component {
  constructor(props) {
    super(props);
    var { lineNumber, active=false } = props;
    this.state = {
      lineNumber,
      active
    };
  }

  focus() {
    this.setState({
      active: true
    });
  }

  render() {
    if (this.state.active) {
      return (
        <li class="proof-line proof-line--prompted">
          <div class="proof-line__line-number proof-line--prompted__line-number proof-line__line-number--active">{this.props.lineNumber}</div>
          <div class="proof-line--prompted__prompt proof-line--prompted__prompt--focus">Choose line(s) to apply rule</div>
        </li>
      )
    } else {
      return (
        <li class="proof-line proof-line--prompted">
          <div onClick={this.focus.bind(this)} class="proof-line--prompted__prompt proof-line--prompted__prompt--blur">Click to continue from here</div>
        </li>
      )
    }
  }
}

export default ProofPrompt;
