import React from 'react';

class SequentCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: 'Premises'
    };
  }

  handleChangePrem(e) {
    var value = e.target.value;
    value = value.replace(/\^/gi,'∧');
    value = value.replace(/\+/gi,'∨');
    value = value.replace(/~/gi,'¬');
    value = value.replace(/(=>)|(->)/gi,'→');
    this.props.updatePremises(value.split(','));
  }

  handleChangeCon(e) {
    var value = e.target.value;
    value = value.replace(/\^/gi,'∧');
    value = value.replace(/\+/gi,'∨');
    value = value.replace(/~/gi,'¬');
    value = value.replace(/(=>)|(->)/gi,'→');
    this.props.updateConclusion(value);
  }

  render() {
    return (
      <div class="grid container">
        <div class="col-5-12 text-center">
          <input class="text-field text-field--large text-field--full" placeholder="Enter Premises here..." onChange={this.handleChangePrem.bind(this)} autofocus="autofocus"/>
        </div>
        <div class="col-5-12 text-center col-offset-2-12">
          <input class="text-field text-field--large text-field--full" placeholder="Enter Conclusion here..." onChange={this.handleChangeCon.bind(this)} autofocus="autofocus"/>
        </div>
      </div>
    )
  }
}

export default SequentCreator;
