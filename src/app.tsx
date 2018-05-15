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
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/home">Home</a></li>
        </ul>
        <div className = "page">{this.props.children}</div>
      </div>
    )
  }
}
