import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routes from 'router/index'
import Store from 'store/index'
import 'styles/base.less'

ReactDOM.render(
  <Provider store={Store}>
     <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
