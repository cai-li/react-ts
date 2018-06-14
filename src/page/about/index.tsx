import * as React from 'react'
import { browserHistory } from 'react-router'
import Store from '../../store/index'
import './about.scss'

export default class About extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public toHome(){
    console.log(Store.getState())
    browserHistory.push("/login")
  }

  public render() {
    return (
      <div className="about" onClick = {()=> this.toHome()}>
        关于我们
      </div>
    )
  }
}
