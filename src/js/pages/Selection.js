import React from 'react';
import { Link } from 'react-router';

import SequentCreator from './selection/SequentCreator';

class Selection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      premises: [],
      conclusion: ''
    };
  }

  updateConclusion(conclusion) {
    this.setState({ conclusion });
  }

  updatePremises(premises) {
    this.setState({ premises });
  }


  render() {
    return (
      <div class="container container--medium container--centered container--spacey">
        <h1 class="page-title">Natural Deduction Assistant</h1>
        <div>{ this.state.premises.join(', ') }</div>
        <SequentCreator updateConclusion={this.updateConclusion.bind(this)} updatePremises={this.updatePremises.bind(this)} />
      </div>);
  }
}

export default Selection;
