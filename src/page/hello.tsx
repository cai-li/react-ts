import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from 'store/storeState'
import {
  GetVisibilityFilterAction, GetAddTodoAction, GetToggleTodoAction,
} from 'actionCreators/helloActionCreator'
import { Button, Icon } from 'antd'
import './hello.less'
import Affix from 'component/affix/index'
import LiIcon from 'component/icon/icon'
import LiButton from 'component/button/index'

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
    this.state = {
      iconload: false
    }
  }

  private fetchCounter1() {
    this.props.addTodo('张山', false)
  }

  private filterChanged(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.filterVisibility(e.target.value)
  }

  private toggleTodo() {
    if (this.props.todos.length === 0) return
    this.props.toggleTodo(0)
  }

  private iconClick(e: React.MouseEvent) {
    console.log('liicon')
  }

  private mouseover: React.MouseEventHandler<HTMLElement> = e => {
    // e.stopPropagation()
    console.log('123')
  }

  private liButtonClick: React.MouseEventHandler<HTMLElement> = e => {
    // e.stopPropagation()
   
    this.setState({
      iconload: { delay: 2000 }
    })
  }

  public render() {
    const { todos, visibilityFilter } = this.props
    const todosFilted = todos.filter((todo) => todo.text.includes(visibilityFilter))

    return (
      <div className="pageHello">
        {/* todo */}
        <div className="pageHello-todo">
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

        {/* Icon */}
        <LiIcon type='bitian' onClick={(e) => this.iconClick(e)} />

        {/* Button */}
        <LiButton
          loading={this.state.iconload}
          type='ghost'
          onClick={this.liButtonClick}>
          测试
        </LiButton>

        {/* 固钉组件 */}
        <div className="affixWrapper">
          <Affix />
          <div className="content">固钉内容</div>
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
