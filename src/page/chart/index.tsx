import * as React from 'react'
import './chart.less'

export default class Chart extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="pageChart">
      chart
      </div>
    )
  }
}
