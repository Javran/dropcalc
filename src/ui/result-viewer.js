import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  Panel, Table,
} from 'react-bootstrap'

import {
  resultParamsDescSelector,
  resultStatRowsSelector,
  translateSelector,
} from '../selectors'
import { PTyp } from '../ptyp'

class ResultViewerImpl extends PureComponent {
  static propTypes = {
    paramsDesc: PTyp.string.isRequired,
    rows: PTyp.array.isRequired,
    tr: PTyp.func.isRequired,
  }

  render() {
    const {paramsDesc,rows,tr} = this.props
    return (
      <Panel header={tr('Result.Title')}>
        <div style={{marginBottom: 5}}>{paramsDesc}</div>
        <Table
          style={{tableLayout: 'fixed'}}
          striped bordered condensed hover>
          <thead>
            <tr>
              <th style={{width: '30%', fontWeight: 'bold'}}>
                #
              </th>
              <th style={{width: '45%', fontWeight: 'bold'}}>
                %
              </th>
              <th style={{fontWeight: 'bold'}}>
                % ({tr('Result.CD')})
              </th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map(([countOrAbort,count,rate,rateNB]) => (
                <tr key={countOrAbort}>
                  <td>
                    {
                      countOrAbort === 'aborted' ?
                        tr('Result.Aborted') :
                        `≤${countOrAbort}`
                    }
                  </td>
                  <td>{`${(rate*100).toFixed(2)}% (${count})`}</td>
                  <td>
                    {
                      countOrAbort === 'aborted' ?
                        '-' :
                        `${(rateNB*100).toFixed(2)}%`
                    }
                  </td>
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
    ...translateSelector(state),
  })
)(ResultViewerImpl)

export { ResultViewer }
