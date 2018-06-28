import * as React from 'react'
import { Router, Route, IndexRoute, RouterState, RedirectFunction } from 'react-router'
import hashHistory from './history'
import App from 'app'
import JwtService from 'services/jwtService'
import CacheService from 'services/cacheService'
import UserService from 'services/userService'
import { RouteDef } from './routerdef'
import { When } from 'utils/common'

const P404 = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/404/index").default);
  }, () => { }, '404')
}

const Login = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/login/index").default);
  }, () => { }, 'login')
}

const About = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/about/index").default);
  }, () => { }, 'about')
}

const Hello = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/hello").default);
  }, () => { }, 'hello')
}

const Home = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/home/index").default);
  }, () => { }, 'home')
}

const Message = (location: any, cb: any) => {
  require.ensure([], (require: NodeRequire) => {
    cb(null, require("../page/message/message").default);
  }, () => { }, 'message')
}

function trustedRoute(state: RouterState) {
  const query = UserService.current ? { user: UserService.current.id } : void 0
  return {
    pathname: state.location.pathname,
    query
  }
}

// url发生变化
async function isChanged(prevState: RouterState, nextState: RouterState, replace: RedirectFunction) {
  try {
    if (UserService.current) {
      // 从登录页面进入
      if (prevState.location.pathname === '/') {
        console.log(10)
      } else if (nextState.location.query.user !== UserService.current.id) {
        replace(trustedRoute(nextState))
      }
    }
  } catch (e) {
    /**
     * 若加载过程发生错误，则清除缓存并返回登录页
     */
    await CacheService.clear()
    CacheService.close()
    replace('/')
  }
}

// 进入home时
async function isEnterHome(nextState: RouterState, replace: RedirectFunction): Promise<void> {
  var reg = /\/home.*/
  const inhomepage = reg.test(nextState.location.pathname)
  // 没有通过登录进入home
  if (!UserService.current && !nextState.location.query.user && inhomepage) {
    replace('/')
    return
  }

  try {
    /**
      * 用户会话识别
      */
    const session = nextState.location.query.user
    if (session === void 0) throw new Error('Session parameter lost.')

    /**
     * websocket登录(useId存在获取新jwt，登录)
     */
    const userInfo = await UserService.refresh(session)
    if (userInfo === void 0) throw new Error('Auth failed.')

    const jwt = await JwtService.loadJwt()

    if (!jwt) {
      replace('/')
    }

  } catch (e) {
    /**
      * 若加载过程发生错误，则清除缓存并返回登录页
      */
    await CacheService.clear()
    CacheService.close()
    replace('/')
  }

}

export default () => (
  <Router history={hashHistory}>
    <Route path="/"
      component={App}>
      {/* 登录 */}
      <IndexRoute getComponent={Login} />
      {/* home */}
      <Route path={RouteDef.home}
        getComponent={Home}
        onChange={isChanged}
        onEnter={isEnterHome}>
        {/* 关于我们 */}
        <Route path={RouteDef.about}
          getComponent={About} />
        {/* 消息中心 */}
        <Route path="messages/:id"
          getComponent={Message} />
        <Route path="messages/:id"
          getComponent={Message}
          onEnter={({ params }: any, replace: any) => replace(`/messages/${params.id}`)} />
      </Route>

      <Route path={RouteDef.hello}
        getComponent={Hello} />
        
      {/* 404 */}
      <Route path="*"
        getComponent={P404} />
    </Route>
  </Router>
)