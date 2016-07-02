import React from 'react';
import parser from '../../classes/Parse/LogicExpressionParser'

class SequentDisplayer extends React.Component {
  render() {

    var premises = this.props.premises.filter(a=>a !== '').map(premise => {
      var valid = parser.isWellformed(premise);
      var className = valid ? 'valid' : 'invalid';
      return <span class={className}>{premise}</span>;
    });

    return (
      <div class="font__medium grid">
        <div class="col-1-2">{premises}</div>
        <div class="col-1-2">{this.props.conclusion}</div>
      </div>
    )
  }
}

export default SequentDisplayer;
