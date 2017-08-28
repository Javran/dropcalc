import React, { Component } from 'react'
import {
  Panel, FormControl, ButtonGroup, Button,
} from 'react-bootstrap'

const mkParamRow = (paramName, editor, key) => (
  <div style={{display: 'flex', alignItems: 'center', marginBottom: 5}} key={key}>
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
                (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <FormControl
                      style={{flex: 1, marginRight: 5}}
                      type="number"
                      placeholder="TODO"
                    />
                    <Button style={{marginRight: 5}}>
                      1000
                    </Button>
                    <Button style={{marginRight: 5}}>
                      10000
                    </Button>
                    <Button>
                      100000
                    </Button>
                  </div>
                ),
              ],
              [
                'Count Before Aborting',
                (
                  <FormControl
                    type="number"
                    placeholder="TODO"
                  />
                ),
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
