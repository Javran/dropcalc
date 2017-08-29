import { createStore, bindActionCreators } from 'redux'
import { mkSimpleReducer } from 'subtender'

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
  result: {
    // TODO
    stats: null,
  },
}

const reducer = mkSimpleReducer(
  initState,
  'DropCalc@modify'
)

const store = createStore(reducer)

window.getStore = store.getState

const actionCreator = {
  modifyState: modifier => ({
    type: 'DropCalc@modify',
    modifier,
  }),
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
