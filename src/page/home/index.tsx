import * as React from 'react'

export default class Home extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="2">
        {this.props.children || "Welcome to your 主页"}
      </div>
    )
  }
}