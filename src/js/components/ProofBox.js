import React from 'react';
import ProofLine from './ProofLine';
import ProofPrompt from './ProofPrompt';

class ProofBox extends React.Component {
  // A proofbox line can be a normal line or
  // a start of an assumption box
  static renderLines(lines) {
    return lines.map(line => {
      // Recursively add prooflines
      var remaining = [].concat(
        <ProofLine { ...line }/>,
        ProofBox.renderLines(line.children)
      );

      if (line.isAssumption()) {
        return (
          <AssummedProofBox>
            {remaining}
            <ProofPrompt lineNumber={1}/>
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
          { ProofBox.renderLines([this.props.proofState]) }
          <ProofPrompt lineNumber={1}/>
        </ul>
      </div>
    );
  }
}

class AssummedProofBox extends ProofBox {
  constructor({open=true}) {
    super();
    this.state = { open };
  }

  closeBox() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    var className = this.state.open ? 'proof-box--assummed--open' : 'proof-box--assummed--closed'
    return (
      <div onClick={this.closeBox.bind(this)} class={"proof-box proof-box--assummed " + className}>
        <ul class="proof-box--assummed__line-contents">
          { this.props.children }
        </ul>
      </div>
    );
  }
}

export default ProofBox;
