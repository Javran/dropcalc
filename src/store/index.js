import { createStore } from 'redux'
import { mkSimpleReducer } from 'subtender'

const initState = {
  params: {
    dropRateRaw: '5%',
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

export {
  store,
}
