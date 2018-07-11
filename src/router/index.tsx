import * as React from 'react'
import { Router, Route, IndexRoute, RouterState, RedirectFunction } from 'react-router'
import hashHistory from './history'
import { When } from 'utils/common'
import JwtService from 'services/jwtService'
import CacheService from 'services/cacheService'
import UserService from 'services/userService'
import { RouteDef } from './routerdef'
import App from 'app'

/**
 * 路由链接携带query，为userID
 *
 * @param {RouterState} state
 * @returns
 */
function trustedRoute(state: RouterState) {
  const query = UserService.current ? { user: UserService.current.id } : void 0
  return {
    pathname: state.location.pathname,
    query,
  }
}

async function backLogin(replace: RedirectFunction) {
  await CacheService.clear()
  CacheService.close()
  replace('/')
}

/**
 * home内路由发生变化
 *
 * @param {RouterState} prevState
 * @param {RouterState} nextState
 * @param {RedirectFunction} replace
 */
async function isChanged(prevState: RouterState, nextState: RouterState, replace: RedirectFunction) {
  try {
    if (UserService.current) {
      // 登录页面内，当手动输入url时路由跳转
      if (prevState.location.pathname !== '/' && nextState.location.query.user !== UserService.current.id) {
        replace(trustedRoute(nextState))
      }
    }
  } catch (e) {
    /**
     * 若加载过程发生错误，则清除缓存并返回登录页
     */
    backLogin(replace)
  }
}

/**
 * 路由进入Home时
 *
 * @param {RouterState} nextState
 * @param {RedirectFunction} replace
 * @returns {Promise<void>}
 */
async function isEnterHome(nextState: RouterState, replace: RedirectFunction): Promise<void> {
  try {
    /**
     * 用户会话识别
     */
    const session = nextState.location.query.user
    const reg = /\/home.*/
    const inhomepage = reg.test(nextState.location.pathname)
    // 没有通过登录进入home
    if (!UserService.current && inhomepage) {
      if (!session) {
        hashHistory.push('/')
        return
      } else {
        /**
         * websocket登录(useId存在获取新jwt，登录)
         */
        const userInfo = await UserService.refresh(session)
        if (userInfo === void 0) throw new Error('Auth failed.')

        if (!await JwtService.loadJwt()) {
          backLogin(replace)
        }
      }
    }
  } catch (e) {
    /**
     * 若加载过程发生错误，则清除缓存并返回登录页
     */
    backLogin(replace)
  }
}

const P404 = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/404/index').default)
  }, () => { }, '404')
}

const Login = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/login/index').default)
  }, () => { }, 'login')
}

const Home = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/home/index').default)
  }, () => { }, 'home')
}

const Table = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/table/index').default)
  }, () => { }, 'table')
}

const Chart = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/chart/index').default)
  }, () => { }, 'chart')
}

const Chat = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/chat/index').default)
  }, () => { }, 'chat')
}

const Editor = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/editor/index').default)
  }, () => { }, 'editor')
}

const Hello = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require('../page/hello').default)
  }, () => { }, 'hello')
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/"
      component={App}>
      {/* 登录 */}
      <IndexRoute getComponent={Login} />
      {/* home */}
      <Route path={`/${RouteDef.home}`}
        getComponent={Home}
        onChange={isChanged}
        onEnter={isEnterHome}>
        {/* 表格 */}
        <Route path={RouteDef.table}
          getComponent={Table} />

        {/* 图表 */}
        <Route path={RouteDef.chart}
          getComponent={Chart} />

        {/* 编辑器 */}
        <Route path={RouteDef.editor}
          getComponent={Editor} />

        {/* 聊天室 */}
        <Route path={RouteDef.chat}
          getComponent={Chat} />

        <Route path={RouteDef.hello}
          getComponent={Hello} />
      </Route>

      {/* 404 */}
      <Route path="*"
        getComponent={P404} />
    </Route>
  </Router>
)
