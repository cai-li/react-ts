import * as React from 'react'
import './hello.less'
import Store from '../store/index'
import HelloAction, { HelloProps, HelloState, ItemTodo } from 'store/helloAction'
import { Button } from 'antd'

export default class Hello extends React.Component<HelloProps, HelloState> {
  public state: HelloState
  private unsubscribe: any
  constructor(props: HelloProps) {
    super(props)
    this.state = {
      todos: [
        { text: 'caili', completed: false },
      ],
      visibilityFilter: '',
    }
  }

  private fetchCounter1() {
    HelloAction.bindAddTodo('张山')
  }

  private filterChanged(e: any) {
    HelloAction.bindFilter(e.target.value)
  }

  public componentDidMount() {
    this.unsubscribe = Store.subscribe(() => {
      this.setState(Store.getState())
    })
  }

  public componentWillUnmount() {
    this.unsubscribe()
  }

  public render() {
    let { todos, visibilityFilter } = this.state
    if (this.state) {
      todos = todos.filter((todo) => todo.text.includes(visibilityFilter))
    }

    return (
      <div className="hello">
        <input type="text" value={visibilityFilter} onChange={(e) => this.filterChanged(e)} />

        <div className="greeting">
          {todos && todos.map((todo, index) => {
            return <div key={index}>{`${todo.text}--${todo.completed}`}</div>
          })}
        </div>

        <div className="buttonGroup">
          <Button onClick={() => this.fetchCounter1()}>dispatch</Button>
          <Button type="primary">Dashed</Button>
        </div>
      </div>
    )
  }
}
