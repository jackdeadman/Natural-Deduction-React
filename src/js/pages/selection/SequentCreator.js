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
      <div class="grid container container--spacey">
        <div class="col-1-2 container">
          <div class="input-box input-box--focused">
            <label class="input-box__label">Premises</label>
            <input class="input-box__input" placeholder="e.g. A∨B, A→C, B→C"></input>
          </div>
        </div>
        <div class="col-1-2 container">
          <div class="input-box">
            <label class="input-box__label">Conclusion</label>
            <input class="input-box__input" placeholder="e.g. C"></input>
          </div>
        </div>
      </div>
    )
  }
}

export default SequentCreator;
