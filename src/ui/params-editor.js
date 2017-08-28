import React, { Component } from 'react'
import {
  Panel, FormControl, ButtonGroup, Button,
} from 'react-bootstrap'

const mkParamRow = (paramName, editor, key) => (
  <div style={{display: 'flex', alignItems: 'center', marginBottom: 5}} key={key}>
    <div style={{flex: 1, maxWidth: '16em'}}>
      {paramName}
    </div>
    <div style={{flex: 3}}>
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
                (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <FormControl
                      style={{flex: 1, marginRight: 5}}
                      type="text"
                      placeholder="TODO"
                    />
                    <span style={{fontSize: '1.2em', fontWeight: 'bold'}}>%</span>
                  </div>
                ),
              ],
              [
                'Experiment Count',
                (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <FormControl
                      style={{flex: 1, marginRight: 5}}
                      type="number"
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
