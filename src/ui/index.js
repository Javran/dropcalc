import React, { Component } from 'react'

import { ParamsEditor } from './params-editor'

class DropCalcMain extends Component {
  render() {
    return (
      <div style={{padding: 10, minWidth: 600}}>
        <ParamsEditor />
        <div>Result placeholder</div>
      </div>
    )
  }
}

export { DropCalcMain }
