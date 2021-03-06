import * as React from 'react'
import { browserHistory } from 'react-router'
import { Button } from 'antd'
import './about.less'

export default class About extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public toHome() {
    browserHistory.push("/login")
  }

  public render() {
    return (
      <div className="about" onClick={() => this.toHome()}>
        <Button type="primary">Dashed</Button>
      </div>
    )
  }
}
