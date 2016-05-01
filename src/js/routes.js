import React from 'react'
import { IndexRoute, Route } from 'react-router'

import { Index } from './components'
import { App } from './containers'

export default (
	<Route path='/' component={App} >
		<IndexRoute component={Index} />
		<Route path='test' component={Index} />
	</Route>
)
