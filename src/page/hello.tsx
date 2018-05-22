import * as React from 'react'
import Store from '../store/index'
import { HelloProps, ItemTodo, HelloState } from '../store/helloreducer'
import HelloAction from '../store/helloAction'

export default class Hello extends React.Component<HelloProps, HelloState> {
  public state: HelloState
  constructor(props: HelloProps) {
    super(props)
    this.state = {
      todos: [
        { text: 'caili', completed: false }
      ],
      visibilityFilter: '',
    }
  }

  public fetchCounter1() {
    HelloAction.bindAddTodo('张山')
  }

  private filterChanged(e: any) {
    HelloAction.bindFilter(e.target.value)
  }

  public componentDidMount() {
    const unsubscribe = Store.subscribe(() => {
      this.setState(Store.getState())
    })
  }

  public componentWillUnmount() {

  }

  public render() {
    let todos 
    if(this.state) {
      todos = this.state.todos.filter((todo)=> todo.text.includes(this.state.visibilityFilter))
    }

    return (
      <div className="hello">
        <input type="text" value={this.state.visibilityFilter} onChange={(e) => this.filterChanged(e)} />

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
