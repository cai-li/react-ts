import * as React from 'react'
import { browserHistory } from 'react-router'

export default class About extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public toHome(){
    browserHistory.push("/login")
  }

  public render() {
    return (
      <div className="32" onClick = {()=> this.toHome()}>
        关于我们
      </div>
    )
  }
}
