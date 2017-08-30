import _ from 'lodash'
import { createSelector } from 'reselect'

import { computeCDF } from './compute-cdf'

const paramsSelector =
  state => state.params

const resultSelector =
  state => state.result


/*
   Produces null or normalized set of parameters.
   A normalized set of parameters must be a valid parameter for simulation,
   satisfying:

   - 0 < dropRate < 1
   - experimentCount > 0
   - beforeAbort > 0
 */
const normParamsSelector = createSelector(
  paramsSelector,
  ({dropRatePercentStr, experimentCount, beforeAbort}) => {
    const dropRate =
      dropRatePercentStr &&
      Number(dropRatePercentStr) / 100
    if (! _.isFinite(dropRate) || dropRate <= 0 || dropRate >= 1)
      return null
    if (experimentCount <= 0 || beforeAbort <= 0)
      return null
    return {dropRate, experimentCount, beforeAbort}
  })

const canSimulateSelector = createSelector(
  normParamsSelector,
  normParams => Boolean(normParams))

const hasResultSelector = createSelector(
  resultSelector,
  result => Boolean(result)
)

const resultParamsDescSelector = createSelector(
  resultSelector,
  ({params}) => {
    const {
      dropRate,
      beforeAbort,
      experimentCount,
    } = params
    return [
      `Drop Rate: ${(dropRate*100).toFixed(4)}%`,
      `Experiment Count: ${experimentCount}`,
      `Attempts Before Aborting: ${beforeAbort}`,
    ].join(', ')
  }
)

const resultStatRowsSelector = createSelector(
  resultSelector,
  ({stats,params}) => {
    const {experimentCount, dropRate} = params
    let abortRow
    let nonAbortStats
    if (_.last(stats)[0] === 'aborted') {
      abortRow = _.last(stats)
      nonAbortStats = _.initial(stats)
    } else {
      abortRow = null
      nonAbortStats = stats
    }
    const rows = []
    let ind = 0
    let count = 0
    let curLessOrEq = 10
    while (ind < nonAbortStats.length) {
      while (
        ind < nonAbortStats.length &&
        nonAbortStats[ind][0] <= curLessOrEq
      ) {
        count += nonAbortStats[ind][1]
        ++ind
      }
      if (ind >= nonAbortStats.length)
        break
      rows.push([curLessOrEq,count])
      curLessOrEq += 10
    }
    if (_.last(rows)[0] !== curLessOrEq) {
      rows.push([curLessOrEq,count])
    }
    return (abortRow ? [...rows, abortRow] : rows).map(
      ([k,v]) => [
        k,
        v,
        v/experimentCount,
        k === 'aborted' ? null : computeCDF(dropRate, k),
      ])
  }
)

export {
  paramsSelector,
  normParamsSelector,
  canSimulateSelector,
  hasResultSelector,
  resultParamsDescSelector,
  resultStatRowsSelector,
}
