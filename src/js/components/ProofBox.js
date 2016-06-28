import React from 'react';
import ProofLine from './ProofLine';
import Proof from './../classes/Proof';

class ProofBox extends React.Component {
  // A proofbox line can be a normal line or
  // a start of an assumption box
  static renderLines(lines) {
    return lines.map(line => {
      var remaining = [].concat(
        <ProofLine lineNumber={line.lineNumber()} rule={line.rule} equation={line.equation}/>,
        ProofBox.renderLines(line.children)
      );

      if (line.isAssumption()) {
        return (
          <AssummedProofBox>{ remaining }</AssummedProofBox>
        );
      } else {
        return remaining;
      }
    });
  }

  render() {
    return (
      <div class="proof-box proof-box--main">
        <ul class="proof-box__line-contents">
          { ProofBox.renderLines([this.props.proofState]) }
        </ul>
      </div>
    );
  }
}

class AssummedProofBox extends ProofBox {
  render() {
    return (
      <div class="proof-box proof-box--assummed proof-box--assummed--closed">
        <ul class="proof-box--assummed__line-contents">
          { this.props.children }
        </ul>
      </div>
    );
  }
}

export default ProofBox;
