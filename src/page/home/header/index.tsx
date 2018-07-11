import * as React from 'react'
import { Dropdown, Menu, Icon } from 'antd'
import UserService from 'services/userService'
import JwtService from 'services/jwtService'
import hashHistory from 'router/history'
import './header.less'

export default class Header extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  private get user() {
    return UserService.current
  }

  private async logout(): Promise<void> {
    await UserService.logout()
    await JwtService.clearJwt()
    hashHistory.push('/')
  }

  public render() {
    const menu = (
      <Menu className="setting-menu">
        <Menu.Item key="0">
          <p>信息编辑</p>
        </Menu.Item>
        <Menu.Item key="1">
          <p>修改密码</p>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <p onClick={() => this.logout()}>退出</p>
        </Menu.Item>
      </Menu>
    );

    return (
      <header className="homeHead">
        <div className="homeHead-logo">little li 的网站</div>
        <Dropdown overlay={menu} trigger={['click']}>
          <div className="homeHead-user">
            <span>{this.user.username}</span>
            <Icon type="down" />
          </div>
        </Dropdown>
      </header>
    )
  }
}
