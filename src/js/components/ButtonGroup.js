import React from 'react'

class ButtonGroup extends React.Component {
  convertButton(el, index) {
    var className = "button-group__button " + el.props.className;
    return (
      <button key={index} class={className}>
        {el.props.children}
      </button>
    );
  }

  render() {
    return (
      <div class="button-group">
        {this.props.children.map(this.convertButton)}
      </div>
    );
  }
}

export default ButtonGroup;
