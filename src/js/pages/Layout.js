import React from 'react'

import Header from './layout/Header'
import Controls from './layout/Controls'

class Layout extends React.Component {

  render() {
    return (
      <div class="grid">
        <div class="col-1-2"><Header/></div>
        <div class="col-1-2"><Controls/></div>
      </div>
    );
  }

}

export default Layout;
