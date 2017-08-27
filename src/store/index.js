import { createStore } from 'redux'

const reducer = (state = null, _action) => state

const store = createStore(reducer)

window.getStore = store.getState

export {
  store,
}
