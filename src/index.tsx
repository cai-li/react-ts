import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routes from 'router/index'
import { configureStore } from 'store/createStore'
import 'styles/base.less'

const Store = configureStore()

ReactDOM.render(
  <Provider store={Store}>
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
