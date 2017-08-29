import _ from 'lodash'
import { modifyObject } from 'subtender'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel, FormControl, Button,
} from 'react-bootstrap'

import { paramsSelector, canSimulateSelector } from '../selectors'
import { PTyp } from '../ptyp'
import { mapDispatchToProps } from '../store'
import { performSimulateAsync } from '../simulate'

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
    dropRatePercentStr: PTyp.string.isRequired,
    experimentCount: PTyp.number.isRequired,
    beforeAbort: PTyp.number.isRequired,
    canSimulate: PTyp.bool.isRequired,
    modifyState: PTyp.func.isRequired,
  }

  modifyParams = modifier =>
    this.props.modifyState(
      modifyObject('params', modifier)
    )

  handleChangeParam = which => e => {
    const val = Number(e.target.value)
    if (_.isInteger(val) && val >= 0) {
      this.modifyParams(
        modifyObject(which, () => val)
      )
    }
  }

  handleChangeDropRate = e => {
    const raw = e.target.value.trim()
    const updateDropRate = () =>
      this.modifyParams(
        modifyObject('dropRatePercentStr', () => raw)
      )

    if (raw === '.') {
      updateDropRate()
      return
    }

    const val = Number(raw)
    if (_.isFinite(val) && val >= 0 && val <= 100) {
      updateDropRate()
    }
  }

  handleClickExperimentCount = newVal => () =>
    this.modifyParams(
      modifyObject(
        'experimentCount',
        () => newVal
      )
    )

  render() {
    const {
      dropRatePercentStr, experimentCount, beforeAbort,
      canSimulate,
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
                      onChange={this.handleChangeDropRate}
                      style={{flex: 1, marginRight: 5}}
                      type="text"
                      value={dropRatePercentStr}
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
                      onChange={this.handleChangeParam('experimentCount')}
                      style={{flex: 1, minWidth: '5em', marginRight: 5}}
                      type="text"
                      value={String(experimentCount)}
                    />
                    {
                      (() => {
                        const xs = [1000,10000,100000]
                        return xs.map((val,ind) => (
                          <Button
                            key={val}
                            onClick={this.handleClickExperimentCount(val)}
                            style={ind+1 === xs.length ? {} : {marginRight: 5}}>
                            {val}
                          </Button>
                        ))
                      })()
                    }
                  </div>
                ),
              ],
              [
                'Attempts Before Aborting',
                (
                  <FormControl
                    onChange={this.handleChangeParam('beforeAbort')}
                    type="text"
                    value={String(beforeAbort)}
                  />
                ),
              ],
            ].map((args, ind) =>
              mkParamRow(...args, ind)
            )
          }
          <div
            style={{display: 'flex', flexDirection: 'row-reverse'}}
          >
            <Button
              bsStyle={canSimulate ? 'success' : 'danger'}
              disabled={!canSimulate}
              onClick={performSimulateAsync}
            >
              Simulate
            </Button>
          </div>
        </div>
      </Panel>
    )
  }
}

const ParamsEditor = connect(
  state => ({
    ...paramsSelector(state),
    canSimulate: canSimulateSelector(state),
  }),
  mapDispatchToProps,
)(ParamsEditorImpl)

export { ParamsEditor }
