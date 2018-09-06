import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import hashHistory from 'router/history'
import { PageMap } from 'router/routerdef'
import Header from 'page/home/header/index'
import NavMenu from 'page/home/navMenu/index'
import classNames from 'classnames'
import './home.less'

export default class Home extends React.Component<RouteComponentProps<any, any>, any> {
  public state: any

  constructor(props: RouteComponentProps<any, any>) {
    super(props)
    this.state = null
  }

  public render() {
    const { children, location } = this.props
    const homeClass = classNames({
      'homeMain-pages': true,
      'homeMain-noPage': !this.props.children
    })

    return (
      <div className="pageHome">
        <Header />
        <main className="homeMain">
          <NavMenu pathname={location.pathname}></NavMenu>
          <main className={homeClass}>
            {!children ? <h1 className="homeMain-noPage--wel">welcome !</h1> : children}
          </main>
        </main>
      </div>
    )
  }
}
