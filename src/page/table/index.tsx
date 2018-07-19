import * as React from 'react'
import './table.less'

export default class Table extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="pageTable">
      </div>
    )
  }
}
