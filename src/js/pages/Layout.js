import React from 'react'

import Header from './layout/Header'
import Controls from './layout/Controls'
import ProofDeclaration from './layout/ProofDeclaration'
import ProofBox from './../components/ProofBox'

import Proof from './../classes/Proof'

import proofStore from './../stores/ProofStore'
import * as ProofActions from './../actions/ProofActions'

class Layout extends React.Component {
  constructor(props) {
    super(props);

    var premises = ['A∧B'];
    var conclusion = 'C';
    this.state = {
      premises,
      conclusion,
      proofState: proofStore.getProofState()
    };
  }

  componentWillMount() {
    proofStore.on('change', () => {
      this.setState({
        proofState: proofStore.getProofState()
      });
    });
  }

  render() {
    return (
      <div class="container container--centered container--medium container--spacey">
        <div class="grid">
          <div class="col-2-3"><Header/></div>
          <div class="col-1-3"><Controls/></div>
        </div>

        <div class="grid">
          <div class="col-2-3">
            <ProofDeclaration premises={this.state.premises} conclusion={this.state.conclusion} />
            <ProofBox proofState={this.state.proofState}/>
          </div>
          <div class="col-1-3">
            {/* <ProofRules/>*/}
          </div>
        </div>
      </div>
    );
  }

}

export default Layout;
