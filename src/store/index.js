import { createStore } from 'redux'
import { mkSimpleReducer } from 'subtender'

const initState = {
  params: {
    /*
       0 <= dropRate <= 1, note that when dropRate is 0,
       we should prevent simulation from happening
     */
    dropRate: 0.05,
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
