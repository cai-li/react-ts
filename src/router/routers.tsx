import * as React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'
import App from '../app'
import About from '../page/about/index'
import Login from '../page/login/index'
import Home from '../page/home/index'
import Message from '../page/message/message'

interface indexRouteCfg {
  component: any
}

interface routeCfg {
  path: string
  component: any
  indexRoute?: indexRouteCfg
  onEnter?: (params:any, replace: any) => void,
  childRoutes?: any,
}

export const routeConfig: Array<routeCfg> = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Login },
    childRoutes: [
      {
        path: 'about',
        component: About,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'home',
        component: Home,
        childRoutes: [{
          path: 'messages/:id',
          onEnter: ({ params }:any, replace:any) => replace(`/messages/${params.id}`)
        }]
      },
      {
        component: Home,
        childRoutes: [{
          path: 'messages/:id',
          component: Message,
        }]
      }
    ]
  }
]