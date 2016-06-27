import React from 'react'
import ButtonGroup from '../../components/ButtonGroup.js'

class Controls extends React.Component {
    render() {
      return (
        <ButtonGroup>
          <button class="button button--dark">Undo</button>
          <button class="button button--dark">Redo</button>
        </ButtonGroup>
      );
    }
}

export default Controls;
