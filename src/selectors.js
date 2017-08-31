import _ from 'lodash'
import { createSelector } from 'reselect'

import { computeCDF } from './compute-cdf'
import { i18nInstances } from './i18n'

const paramsSelector =
  state => state.params

const resultSelector =
  state => state.result

const langSelector =
  state => state.lang


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

const translateSelector = createSelector(
  langSelector,
  lang => {
    const i18nInst = i18nInstances[lang]
    const tr = i18nInst.__.bind(i18nInst)
    const trN = i18nInst.__n.bind(i18nInst)
    return {tr, trN}
  })

const resultParamsDescSelector = createSelector(
  resultSelector,
  translateSelector,
  ({params},{tr}) => {
    const {
      dropRate,
      beforeAbort,
      experimentCount,
    } = params
    return [
      `${tr('Params.DropRate')}: ${(dropRate*100).toFixed(4)}%`,
      `${tr('Params.ExperimentCount')}: ${experimentCount}`,
      `${tr('Params.BeforeAbort')}: ${beforeAbort}`,
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
  langSelector,
  translateSelector,
}
