import * as React from 'react'
import PropTypes from 'prop-types'

export default class TodoContext extends React.Component {
 
  static childContextTypes= {
    color: PropTypes.string
  }

  getChildContext(){
    return {
      color:'yellow'
    }
  }

  public render() {
    return (
      <Message></Message>
    )
  }
}

class Message extends React.Component {
  render(){
    return (
      <Button>哈哈哈嗯嗯</Button>
    )
  }
}

class Button extends React.Component {
  static contextTypes = {
    color: PropTypes.string
  }

  render() {
    return (
      <button style={{color:`${this.context.color}`}}>{this.props.children}</button>
    )
  }
}

