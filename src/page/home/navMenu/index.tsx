import * as React from 'react'
import { Menu, Icon, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import './navMenu.less'
import { PageMap, Page } from 'router/routerdef'
import hashHistory from 'router/history'
import UserService from 'services/userService'

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

  private get calNavClass(): string {
    return this.state.collapsed ? "navMenu navMenu-mini" : "navMenu"
  }

  private iconType(openKey: string): string {
    switch (openKey) {
      case 'primary':
        return 'appstore';
      case 'other':
        return 'setting';
    }
  }

  private get rootSubmenuKeys(): string[] {
    return PageMap.map((page, index) => {
      if (page.children.length > 0) {
        return page.name
      }
    })
  }

  private toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  private onOpenChange(openKeys: string[]) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  private async navOnClick(param: ClickParam) {
    hashHistory.push({
      pathname: `/home/${param.key}`,
      query: { user: UserService.current.id }
    })
  }

  private calNavMenus(): React.ReactNode {
    return this.pageMap && this.pageMap.map((page, index) => {
      if (page.children) {
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
    const { pathname } = this.props
    const navName = /^\/home\/([a-z]+)$/.exec(pathname)
    const selectedKeys: string[] = !navName ? [] : [navName[1]]

    return (
      <aside className={this.calNavClass}>
        <div className="navMenu-switch" onClick={() => this.toggleCollapsed()}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>

        <Menu
          className="navMenu-menu"
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          selectedKeys={selectedKeys}
          onClick={(ClickParam) => this.navOnClick(ClickParam)}
          openKeys={this.state.openKeys}
          onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
        >
          {this.calNavMenus()}
        </Menu>
      </aside>
    )
  }
}