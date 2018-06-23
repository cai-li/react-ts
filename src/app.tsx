import * as React from 'react'

export default class App extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="appWrapper">
        {this.props.children}
      </div>
    )
  }
}
