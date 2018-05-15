import * as React from 'react'
import Store from '../store/index'
import { HelloProps, ItemTodo, HelloState } from '../store/reducer'
import { bindAddTodo, bindToggleTodo, bindFilter, bindOther } from '../store/helloAction';

export default class Hello extends React.Component<HelloProps, HelloState> {
  public state: HelloState
  constructor(props: HelloProps) {
    super(props)
    this.state = null
  }

  public fetchCounter1() {

    bindAddTodo('add')
    bindOther('wee')
  }

  public render() {
    const unsubscribe = Store.subscribe(() => {
      console.log(12)
      this.setState(Store.getState())
    })
    const todos = this.state && this.state.todos
    return (
      <div className="hello">
        <div className="greeting">
          {todos && todos.map((todo, index) => {
            return <div key={index}>{`${todo.text}--${todo.completed}`}</div>
          })}
        </div>
        <div className="buttonGroup">
          <button onClick={(e) => this.fetchCounter1()}>dispatch</button>
        </div>
      </div>
    )
  }
}
