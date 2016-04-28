require('file?name=[name].[ext]!../index.html')
require('babel-polyfill')

/* react */
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

/* redux */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers'
import routes from './routes'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store} >
		<Router history={history} >
			{routes}
		</Router>
	</Provider>
, document.getElementById('mainSection'))
