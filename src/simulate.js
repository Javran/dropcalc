import _ from 'lodash'
import {
  projectorToComparator,
  modifyObject,
} from 'subtender'
import { store, withBoundActionCreator } from './store'
import { normParamsSelector } from './selectors'

const simulate = (dropRate, beforeAbort) => {
  for (
    let attemptCount = 1;
    attemptCount <= beforeAbort;
    ++attemptCount
  ) {
    const success = Math.random() <= dropRate
    if (success)
      return attemptCount
  }
  return 'aborted'
}

const performSimulate = () => {
  const params = normParamsSelector(store.getState())
  if (!params)
    return

  const {
    dropRate, experimentCount, beforeAbort,
  } = params

  const resultStats = {}

  for (
    let performedECount = 1;
    performedECount <= experimentCount;
    ++performedECount
  ) {
    const result = simulate(dropRate, beforeAbort)
    if (result in resultStats) {
      ++resultStats[result]
    } else {
      resultStats[result] = 1
    }
  }

  const stats = _.toPairs(resultStats).map(
    ([k,v]) =>
      [k === 'aborted' ? k : Number(k), v]
  ).sort(
    projectorToComparator(([k]) =>
      k === 'aborted' ? Infinity : k)
  )

  withBoundActionCreator(({modifyState}) =>
    modifyState(
      modifyObject(
        'result',
        () => ({stats, params})
      )
    )
  )
}

const performSimulateAsync = () =>
  setTimeout(performSimulate)

export { performSimulateAsync }
