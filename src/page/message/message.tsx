import * as React from 'react'

interface PropsType {
  params?: any
  [name: string]: any
}

export default class Message extends React.Component<PropsType, {}>{
  public state: any

  constructor(props: any) {
    super(props)
    this.state = null
  }

  public render() {
    return (
      <div className="2">
        内容1
        {this.props.params.id || '默认'}
      </div>
    )
  }
}