import * as React from 'react'
import hashHistory from '../../router/history'

interface HelloProps {
  children?: any
}

export default class Home extends React.Component<HelloProps, {}> {
  public state: any

  constructor(props: HelloProps) {
    super(props)
    this.state = null
  }

  public toMessage() {
    hashHistory.push('home/messages/1')
  }

  public render() {
    const { children, location } = this.props
    return (
      <div className="2">
        {this.props.children ||
          <div>
            主页
            <button onClick={() => this.toMessage()}>查看详情</button>
          </div>
        }
      </div>
    )
  }
}