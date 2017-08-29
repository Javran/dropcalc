import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ParamsEditor } from './params-editor'
import { ResultViewer } from './result-viewer'
import { PTyp } from '../ptyp'
import { hasResultSelector } from '../selectors'

class DropCalcMainImpl extends Component {
  static propTypes = {
    hasResult: PTyp.bool.isRequired,
  }

  render() {
    const {hasResult} = this.props
    return (
      <div style={{padding: 10, maxWidth: 800}}>
        <ParamsEditor />
        {
          hasResult && (
            <ResultViewer />
          )
        }
      </div>
    )
  }
}

const DropCalcMain = connect(
  state => ({
    hasResult: hasResultSelector(state),
  })
)(DropCalcMainImpl)

export { DropCalcMain }
