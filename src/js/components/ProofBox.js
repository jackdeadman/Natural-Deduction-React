import React from 'react';
import ProofLine from './ProofLine';
import ProofPrompt from './ProofPrompt';

class ProofBox extends React.Component {
  // A proofbox line can be a normal line or
  // a start of an assumption box
  static renderLines(lines, onSelectFunc) {
    return lines.map(line => {
      // Recursively add prooflines
      var remaining = [].concat(
        <ProofLine selected={true} onSelect={onSelectFunc} { ...line }/>,
        ProofBox.renderLines(line.children, onSelectFunc)
      );

      if (line.isAssumption()) {
        var prompt = line.isSound ? null : <ProofPrompt/>;
        return (
          <AssummedProofBox closed={line.isSound}>
            {remaining}
            {prompt}
          </AssummedProofBox>
        );
      } else {
        return remaining;
      }
    });
  }

  render() {
    return (
      <div class="proof-box proof-box--main" onClick={this.closeBox}>
        <ul class="proof-box__line-contents">
          { ProofBox.renderLines([this.props.proofState], this.props.onLineSelect) }
          <ProofPrompt lineNumber={1}/>
        </ul>
      </div>
    );
  }
}

class AssummedProofBox extends ProofBox {
  render() {
    var className = this.props.closed ? 'proof-box--assummed--closed' : 'proof-box--assummed--open'
    return (
      <div class={"proof-box proof-box--assummed " + className}>
        <ul class="proof-box--assummed__line-contents">
          { this.props.children }
        </ul>
      </div>
    );
  }
}

export default ProofBox;
