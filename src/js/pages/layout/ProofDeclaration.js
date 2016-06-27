import React from 'react';

class ProofDeclaration extends React.Component {

  constructor(props) {
    super(props);
    var premises = props.premises.join(', ');

    this.state = {
      premises,
      conclusion: props.conclusion
    }
  }
  render() {
    return(
      <h2 class="proof-declaration">
        { this.state.premises } ⊢ { this.state.conclusion }
      </h2>
    );
  }
}

export default ProofDeclaration;
