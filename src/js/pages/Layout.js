import React from 'react'

import Header from './layout/Header'
import Controls from './layout/Controls'
import ProofDeclaration from './layout/ProofDeclaration'
import ProofBox from './../components/ProofBox'

import Proof from './../classes/Proof'

class Layout extends React.Component {

  render() {
    var premises = ['A∧B'];
    var conclusion = 'C';

    return (
      <div class="container container--centered container--medium container--spacey">
        <div class="grid">
          <div class="col-2-3"><Header/></div>
          <div class="col-1-3"><Controls/></div>
        </div>

        <div class="grid">
          <div class="col-2-3">
            <ProofDeclaration premises={premises} conclusion={conclusion} />
            <ProofBox proofState={Proof.createProof()}/>
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
