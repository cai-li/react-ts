import * as React from 'react'
import './editor.less'
import { RouteComponentProps } from 'react-router'

export default class Editor extends React.Component<RouteComponentProps<any,any,any>,any>{
  public state: any

  constructor(props: RouteComponentProps<any,any,any>) {
    super(props)
    this.state = null
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerLeaveInformation
    )
  }

  // 测试页面内的路由钩子
  private routerLeaveInformation() {
 
  }

  public render() {
    return (
      <div className="pageEditor">
        editor
      </div>
    )
  }
}
