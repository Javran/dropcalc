import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  Panel, Table,
} from 'react-bootstrap'

import {
  resultParamsDescSelector,
  resultStatRowsSelector,
} from '../selectors'
import { PTyp } from '../ptyp'

class ResultViewerImpl extends PureComponent {
  static propTypes = {
    paramsDesc: PTyp.string.isRequired,
    rows: PTyp.array.isRequired,
  }

  render() {
    const {paramsDesc,rows} = this.props
    return (
      <Panel header="Result">
        <div style={{marginBottom: 5}}>{paramsDesc}</div>
        <Table
          style={{tableLayout: 'fixed'}}
          striped bordered condensed hover>
          <thead>
            <tr>
              <th style={{width: '30%', fontWeight: 'bold'}}>
                #
              </th>
              <th style={{fontWeight: 'bold'}}>
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map(([countOrAbort,count,rate]) => (
                <tr key={countOrAbort}>
                  <td>
                    {
                      countOrAbort === 'aborted' ?
                        'Aborted' :
                        `≤${countOrAbort}`
                    }
                  </td>
                  <td>{`${(rate*100).toFixed(2)}% (${count})`}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Panel>

    )
  }
}

const ResultViewer = connect(
  state => ({
    paramsDesc: resultParamsDescSelector(state),
    rows: resultStatRowsSelector(state),
  })
)(ResultViewerImpl)

export { ResultViewer }
