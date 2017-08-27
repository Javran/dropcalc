import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

import { DropCalcMain } from './ui'
import { register } from './registerServiceWorker'

import { store } from './store'

ReactDOM.render(
  (
    <div className="root">
      <Provider store={store}>
        <DropCalcMain />
      </Provider>
    </div>
  ),
  document.getElementById('root'))
register()
