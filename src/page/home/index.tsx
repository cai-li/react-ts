import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import hashHistory from 'router/history'
import { PageMap } from 'router/routerdef'
import Header from 'page/home/header/index'
import NavMenu from 'page/home/navMenu/index'
import './home.less'

export default class Home extends React.Component<RouteComponentProps<any, any>, any> {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  private calHomeClass(): string {
    let className = "homeMain-pages"
    if (!this.props.children) className += " homeMain-noPage"
    return className
  }

  public render() {
    const { children, location } = this.props
    return (
      <div className="pageHome">
        <Header />
        <main className="homeMain">
          <NavMenu pathname={location.pathname}></NavMenu>
          <main className={this.calHomeClass()}>
            {!children && <h1 className="homeMain-noPage--wel">welcome !</h1>}
            {children}
          </main>
        </main>
      </div>
    )
  }
}