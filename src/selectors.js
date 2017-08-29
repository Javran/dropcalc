import _ from 'lodash'
import { createSelector } from 'reselect'

const paramsSelector =
  state => state.params


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

export {
  paramsSelector,
  normParamsSelector,
  canSimulateSelector,
}
