import 'source-map-support/register'

import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import express from 'express'

import http from 'http'
import path from 'path'

import routes from './routes'
import store from './store'

const app = express()

app.use((req, res, next) => {
	match({ routes, location: req.path }, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).send(err.stack)
		} else if (redirectLocation) {
			res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
		} else if (renderProps) {
			res.status(200).send(renderToString(
				<Provider store={store}>
					<RouterContext {...renderProps} />
				</Provider>
			))
		} else {
			/* TODO: it should be a 404 page */
			next()
		}
	})
})

const server = http.createServer(app)
server.listen(8090, () => console.log('server listening to port 8090...'))
