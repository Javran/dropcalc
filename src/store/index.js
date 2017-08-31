import { createStore, bindActionCreators } from 'redux'
import { mkSimpleReducer, modifyObject } from 'subtender'

import { loadPersistState, savePersistState } from './persist'

const initState = {
  params: {
    /*
       0 <= dropRatePercentStr <= 1, note that when dropRate is 0,
       we should prevent simulation from happening
     */
    dropRatePercentStr: '5',
    experimentCount: 1000,
    beforeAbort: 2000,
  },
  /*
     when result is not null: {stats, params}

     - stats: an Array of:

       [<# of attempts> or 'aborted', <count>]

       first element (attempt or 'aborted') is unique amoung members.
       the array is sorted by attempts (in ascending order), and if 'aborted' element is present,
       it's always the last one.

     - params: normalized params for this simulation run
   */
  result: null,
}

const reducer = mkSimpleReducer(
  initState,
  'DropCalc@modify'
)

const loadPreparedState = () => {
  const persist = loadPersistState()
  return {
    ...initState,
    ...persist,
  }
}

const store = createStore(reducer,loadPreparedState())

window.getStore = store.getState

const actionCreator = {
  modifyState: modifier => ({
    type: 'DropCalc@modify',
    modifier,
  }),
  changeLang: newLang => {
    const modifier = modifyObject('lang', () => newLang)
    // TODO: quick and dirty
    const newState = modifier(store.getState())
    savePersistState(newState)
    return actionCreator.modifyState(modifier)
  },
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreator, dispatch)

const withBoundActionCreator = (func, dispatch=store.dispatch) =>
  func(mapDispatchToProps(dispatch))

export {
  store,

  actionCreator,
  mapDispatchToProps,
  withBoundActionCreator,
}
