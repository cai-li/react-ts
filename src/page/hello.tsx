import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from 'store/storeState'
import {
  GetVisibilityFilterAction, GetAddTodoAction, GetToggleTodoAction,
} from 'actionCreators/helloActionCreator'
import { Button } from 'antd'
import './hello.less'

interface ItemTodo {
  text: string
  completed: boolean
}

interface HelloProp {
  todos?: ItemTodo[],
  visibilityFilter?: string,

  filterVisibility?: (visibilityFilter: string) => void,
  addTodo?: (text: string, completed: boolean) => void,
  toggleTodo?: (toggoleTodoIndex: number) => void,
  [type: string]: any,
}

@connect(mapStateToProps, mapDispatchToProps)
class Hello extends React.Component<HelloProp, {}> {
  public state: any
  constructor(props: HelloProp) {
    super(props)
  }

  private fetchCounter1() {
    this.props.addTodo('张山', false)
  }

  private filterChanged(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.filterVisibility(e.target.value)
  }

  private toggleTodo() {
    if(this.props.todos.length === 0) return
    this.props.toggleTodo(0)
  }

  public render() {
    const { todos, visibilityFilter } = this.props
    const todosFilted = todos.filter((todo) => todo.text.includes(visibilityFilter))

    return (
      <div className="hello">
        <input type="text"
          value={visibilityFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.filterChanged(e)} />

        <div className="greeting">
          {todosFilted && todosFilted.map((todo, index) => {
            return <div key={index}>{`${todo.text}--${todo.completed}`}</div>
          })}
        </div>

        <div className="buttonGroup">
          <Button onClick={() => this.fetchCounter1()}>dispatch</Button>
          <Button type="primary" onClick={() => this.toggleTodo()}>toggleTodo</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: StoreState): HelloProp {
  return {
    todos: state.helloCount.todos,
    visibilityFilter: state.helloCount.visibilityFilter,
  }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): HelloProp {
  return {
    filterVisibility: (visibilityFilter: string) => dispatch(GetVisibilityFilterAction(visibilityFilter)),
    addTodo: (text: string, completed: boolean) => dispatch(GetAddTodoAction(text, completed)),
    toggleTodo: (toggoleTodoIndex: number) => dispatch(GetToggleTodoAction(toggoleTodoIndex)),
  }
}

export default Hello
