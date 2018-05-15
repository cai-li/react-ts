import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DatePicker } from 'antd'
import { routeConfig } from './router/routers'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import Store from './store/index'

ReactDOM.render(
  <Provider store={Store}>
     <Router history={hashHistory} routes={routeConfig} />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
