import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel, FormControl, Button,
} from 'react-bootstrap'

import { paramsSelector } from '../selectors'
import { PTyp } from '../ptyp'

const mkParamRow = (paramName, editor, key) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
    }} key={key}>
    <div style={{flex: 1, maxWidth: '16em'}}>
      {paramName}
    </div>
    <div style={{flex: 3}}>
      {editor}
    </div>
  </div>
)

class ParamsEditorImpl extends Component {
  static propTypes = {
    dropRate: PTyp.number.isRequired,
    experimentCount: PTyp.number.isRequired,
    beforeAbort: PTyp.number.isRequired,
  }

  render() {
    const {
      dropRate, experimentCount, beforeAbort,
    } = this.props
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
                      value={String(dropRate*100)}
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
                      type="text"
                      value={String(experimentCount)}
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
                    type="text"
                    value={String(beforeAbort)}
                  />
                ),
              ],
            ].map((args, ind) =>
              mkParamRow(...args, ind)
            )
          }
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button>Simulate</Button>
          </div>
        </div>
      </Panel>
    )
  }
}

const ParamsEditor = connect(
  paramsSelector,
)(ParamsEditorImpl)

export { ParamsEditor }
