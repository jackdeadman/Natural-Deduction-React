import React from 'react';
import _ from 'lodash'

class SequentCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: 'Premises'
    };
  }

  convert(value) {
    value = value.replace(/\^/gi,'∧');
    value = value.replace(/\+/gi,'∨');
    value = value.replace(/~/gi,'¬');
    value = value.replace(/(=>)|(->)/gi,'→');
    return value;
  }

  handleChangePrem(e) {
    var value = e.target.value;
    var re = /(\,|\s)/;
    value = value.split(re);
    value = value.map(this.convert).filter(e=> !((e===' ') || (e===',') || (e==='')));

    this.props.updatePremises(value);
  }

  handleChangeCon(e) {
    var value = e.target.value;
    this.props.updateConclusion(this.convert(value));
  }

  render() {
    return (
      <div class="grid">
        <div class="col-1-2 big-nudge-right">
          <div class="input-box input-box--focused">
            <label class="input-box__label" for="premises">Premises</label>
            <input class="input-box__input" placeholder="e.g. A∨B, A→C, B→C" id="premises" onChange={this.handleChangePrem.bind(this)}></input>
          </div>
        </div>
        <div class="col-1-2 big-nudge-left">
          <div class="input-box">
            <label class="input-box__label" for="conclusion">Conclusion</label>
            <input class="input-box__input" placeholder="e.g. C" id="conclusion" onChange={this.handleChangeCon.bind(this)}></input>
          </div>
        </div>
      </div>
    )
  }
}

export default SequentCreator;
