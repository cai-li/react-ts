import * as React from 'react'
import hashHistory from 'router/history'
import CacheService from 'services/cacheService'
import JwtService from 'services/jwtService'
import UserService from 'services/userService'
import './login.less'

import UserInfoEditor from './component/userInfoEditor'

interface LoginState {
  page: 'login' | 'register'
}

export default class Login extends React.Component<any, LoginState> {
  public state: LoginState

  constructor(props: any) {
    super(props)
    this.state = {
      page: 'login',
    }
  }

  private toRegister() {
    this.setState({
      page: 'register',
    })
  }

  private get title() {
    return this.state.page === 'register' ? '注册' : '登录'
  }

  private async submit(values: any): Promise<void> {
    await UserService.login(values.userName, values.password)

    const query = UserService.current ? { user: UserService.current.id } : void 0
    hashHistory.push({
      pathname: '/home',
      query: { user: UserService.current.id },
    })
  }

  public render() {
    return (
      <div className="pageLogin">
        <header></header>
        <main>
          <div className="pageLogin-form">
            <h1 className="pageLogin-form--title">{this.title}</h1>
            <UserInfoEditor
              onSubmit={(values: any) => this.submit(values)}
              toRegister={() => this.toRegister()} />
          </div>
        </main>
      </div>
    )
  }
}
