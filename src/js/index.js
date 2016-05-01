require('file?name=[name].[ext]!../index.html')
require('babel-polyfill')

/* react */
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

/* redux */
import { applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import routes from './routes'

const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store} >
		<Router history={history} >
			{routes}
		</Router>
	</Provider>
, document.getElementById('mainSection'))
