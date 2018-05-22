import * as React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import hashHistory from './history'
import App from '../app'
import Welcome from '../page/welcome/welcome'

interface indexRouteCfg {
  component: any
}

interface routeCfg {
  path: string
  component: any
  getComponent: any
  indexRoute?: indexRouteCfg
  onEnter?: (params: any, replace: any) => void
  childRoutes?: any
}

const Login = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/login/index").default);
  }, ()=>{} , 'login')
}

const About = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/about/index").default);
  }, ()=>{} , 'about')
}

const Hello = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/hello").default);
  }, ()=>{} , 'hello')
}

const Home = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/home/index").default);
  }, ()=>{} , 'home')
}

const Message = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/message/message").default);
  }, ()=>{} , 'message')
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/"
      component={App}>
      <IndexRoute component={Welcome} />
      <Route path="about"
        getComponent={About} />
      <Route path="login"
        getComponent={Login} />
      <Route path="hello"
        getComponent={Hello} />
      <Route path="home"
        getComponent={Home}>
        <Route path="messages/:id"
          getComponent={Message} />
        <Route path="messages/:id"
          getComponent={Message}
          onEnter={({ params }: any, replace: any) => replace(`/messages/${params.id}`)} />
      </Route>
    </Route>
  </Router>
)