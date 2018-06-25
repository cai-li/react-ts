import * as React from 'react'
import { Button } from 'antd'

import './textButton.less'

interface TextButtonProps {
  padding?: string
  center?: boolean
  inForm?: boolean
}

export default class TextButton extends React.Component<TextButtonProps, any> {
  public state: any

  constructor(props: TextButtonProps) {
    super(props)
    this.state = {
      textStyle: {}
    }
  }

  public textStyle() {
    if (this.props.padding) {
      this.setState({
        textStyle: {
          padding: `0 ${this.props.padding}`
        }
      })
    }
  }

  public render() {
    return (
      <div className="textButton" style={this.state.textStyle}>
        <Button>{this.props.children}</Button>
      </div>
    )
  }
}