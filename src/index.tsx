import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DatePicker } from 'antd'
import Routers from './router/index'
import { Provider } from 'react-redux'
import Store from './store/index'

ReactDOM.render(
  <Provider store={Store}>
     <Routers />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
