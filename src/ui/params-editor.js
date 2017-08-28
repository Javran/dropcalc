import React, { Component } from 'react'
import {
  Panel,
} from 'react-bootstrap'

const mkParamRow = (paramName, editor, key) => (
  <div style={{display: 'flex', alignItems: 'center'}} key={key}>
    <div style={{width: '16em'}}>
      {paramName}
    </div>
    <div style={{flex: 1}}>
      {editor}
    </div>
  </div>
)

class ParamsEditor extends Component {
  render() {
    return (
      <Panel header="Parameters">
        <div>
          {
            [
              [
                'Drop Rate',
                'Edit',
              ],
              [
                'Experiment Count',
                'Edit',
              ],
              [
                'Count Before Aborting',
                'Edit',
              ],
            ].map((args, ind) =>
              mkParamRow(...args, ind)
            )
          }
        </div>
      </Panel>
    )
  }
}

export { ParamsEditor }
