import React from 'react';
import parser from '../../classes/Parse/LogicExpressionParser'

class SequentDisplayer extends React.Component {
  addValid(string) {
    var valid = parser.isWellformed(string);
    var className = valid ? 'valid' : 'invalid';
    return <span class={"sequent-displayer__equation "+className}>{string}</span>;
  }


  render() {
    var premises = this.props.premises.join(', ').split(' ');
    premises = premises.filter(a=>a !== '').map(this.addValid);
    var conclusion = this.addValid(this.props.conclusion);

    return (
      <div class="sequent-displayer">
        <div class="sequent-displayer__premises">{premises}</div>
        <div class="sequent-displayer__turnstile">⊢</div>
        <div class="sequent-displayer__conclusion">{conclusion}</div>
      </div>
    )
  }
}

export default SequentDisplayer;
