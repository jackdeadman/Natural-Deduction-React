import React from 'react';
import { Link } from 'react-router';

import SequentCreator from './selection/SequentCreator';
import SequentDisplayer from './selection/SequentDisplayer';

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
        <div>
          <SequentCreator updateConclusion={this.updateConclusion.bind(this)} updatePremises={this.updatePremises.bind(this)} />
          <SequentDisplayer premises={this.state.premises} conclusion={this.state.conclusion}/>
          <Link to='proof'>Start!</Link>
        </div>
      </div>);
  }
}

export default Selection;
