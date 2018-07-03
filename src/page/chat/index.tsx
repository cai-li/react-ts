import * as React from 'react'
import './chat.less'

export default class Chat extends React.Component {
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="pageChat">
      chat
      </div>
    )
  }
}
