import * as React from 'react'
import { Menu, Icon, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { PageMap, Page } from 'router/routerdef'
import hashHistory from 'router/history'
import UserService from 'services/userService'
import classNames from 'classnames'
import './navMenu.less'

const SubMenu = Menu.SubMenu

interface NavMenuProps {
  pathname: string
}

export default class NavMenu extends React.Component<NavMenuProps, any> {
  public state: any

  constructor(props: NavMenuProps) {
    super(props)
    this.state = {
      collapsed: false,
      openKeys: [PageMap[0].name],
    }
  }

  private get pageMap() {
    return PageMap
  }

  private iconType(openKey: string): string {
    switch (openKey) {
      case 'primary':
        return 'home'
      case 'other':
        return 'team'
      case 'demo':
        return 'smile-o'
    }
  }

  private get rootSubmenuKeys(): string[] {
    return PageMap.map((page, index) => {
      if (page.children.length > 0) {
        return page.name
      }
    })
  }

  private toggleCollapsed(e: Event) {
    e.stopPropagation()
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  private onOpenChange(openKeys: string[]) {
    const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  private async navOnClick(param: ClickParam) {
    hashHistory.push({
      pathname: `/home/${param.key}`,
      query: { user: UserService.current.id }
    })
  }

  private get nowPageName() {
    const { pathname } = this.props
    const navName = /^\/home\/([a-z]+)$/.exec(pathname)
    return !navName ? null : navName[1]
  }

  private initOpenKeys() {

    const navParentPage = this.pageMap.find((page) => {
      if (page.children.length > 0 && this.nowPageName) {
        return page.children.some((child) => {
          return child.name === this.nowPageName
        })
      }
    })

    this.setState({
      openKeys: !navParentPage ? [] : [navParentPage.name],
    })
  }

  public componentDidMount() {
    this.initOpenKeys()
  }

  private calNavMenus(): React.ReactNode {
    return this.pageMap && this.pageMap.map((page, index) => {
      if (page.children.length > 0) {
        return <SubMenu
          key={page.name}
          title={<span><Icon type={this.iconType(page.name)} /><span>{page.title}</span></span>}>
          {page.children.map((nav, navindex) => {
            return <Menu.Item key={nav.name}>
              {nav.title}
            </Menu.Item>
          })}
        </SubMenu>
      } else {
        return <Menu.Item key={page.name}>
          <Icon type={this.iconType(page.name)} />
          <span>{page.title}</span>
        </Menu.Item>
      }
    })
  }

  public render() {
    const selectedKeys: string[] = !this.nowPageName ? [] : [this.nowPageName]
    const navClass = classNames({
      navMenu: true,
      'navMenu-mini': this.state.collapsed
    })
    
    return (
      <aside className={navClass}>
        <div className="navMenu-switch" onClick={(e: any) => this.toggleCollapsed(e)}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>

        <Menu
          className="navMenu-menu"
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          selectedKeys={selectedKeys}
          onClick={(clickParam) => this.navOnClick(clickParam)}
          openKeys={this.state.openKeys}
          onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
        >
          {this.calNavMenus()}
        </Menu>
      </aside>
    )
  }
}
