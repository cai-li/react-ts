import * as React from 'react'
import hashHistory from 'router/history'
import { PageMap } from 'router/routerdef'
import Header from './header/index'
import './home.less'

export default class Home extends React.Component<any,any> {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public toMessage() {
    hashHistory.push('home/messages/1')
  }

  public render() {
    const { children, location } = this.props
    console.log(children)
    return (
      <div className="home-wrapper">
        <Header/>
        <aside>菜单占位</aside>
        <main>{children}</main>
      </div>
    )
  }
}