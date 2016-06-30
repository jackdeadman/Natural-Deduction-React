import React from 'react';

class SequentCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: 'Premises'
    };
  }

  handleChange(e) {
    var value = e.target.value;
    value = value.replace(/\^/gi,'∧');
    value = value.replace(/\+/gi,'∨');
    value = value.replace(/~/gi,'¬');
    value = value.replace(/(=>)|(->)/gi,'→');
    console.log(value);
    this.props.updatePremises(value.split(','));
  }

  handleKeyPress(e) {
    const enterKey = 13;

    if (e.keyCode === enterKey) {
      this.state.editing = 'Conclusion';
    }

  }

  componentDidMount() {
    this.refs.editor.getDOMNode().focus();
  }

  render() {

    return (
      <div>
        <input placeholder="Enter Premises here..." onKeyDown={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} autofocus="autofocus"/>
      </div>
    )
  }
}

export default SequentCreator;
