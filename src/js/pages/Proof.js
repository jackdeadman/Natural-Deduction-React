import React from 'react'

import Header from './layout/Header'
import Controls from './layout/Controls'
import ProofDeclaration from './layout/ProofDeclaration'
import ProofBox from './../components/ProofBox'

import proofStore from './../stores/ProofStore'
import * as proofActions from './../actions/ProofActions'

import ConjunctionIntroduction from './../classes/Proof/Rule/ConjunctionIntroduction'

class Layout extends React.Component {
  constructor(props) {
    super(props);
    var premises = ['A→C','D','¬D'];
    var conclusion = '¬B';
    proofStore.getProofState().setLines();
    this.state = {
      premises,
      conclusion,
      proofState: proofStore.getProofState(),
      selectedLines: []
    }
  }

  componentWillMount() {
    proofStore.on('change', () => {
      proofStore.getProofState().setLines();
      this.setState({
        proofState: proofStore.getProofState()
      });
    });
  }

  applyRule() {
    proofActions.applyRule(ImplicationIntroduction, 4);
    // proofActions.applyRule(ImplicationIntroduction, 1, proofStore.getProofState().lastNumber());
  }

  selectLine(line) {
    console.log(this.state);
    var lines = this.state.selectedLines.concat([line]);
    this.setState({selectedLines: lines});
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
            <ProofBox onLineSelect={this.selectLine.bind(this)} proofState={this.state.proofState}/>
          </div>
          <div class="col-1-3">
             {/*<ProofRules/>*/}
          </div>
        </div>
        <button onClick={this.applyRule.bind(this)} class="button button--dark">Apply Rule</button>
      </div>
    );
  }

}

export default Layout;
