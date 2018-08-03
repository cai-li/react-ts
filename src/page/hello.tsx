import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from 'store/storeState'
import {
  GetVisibilityFilterAction, GetAddTodoAction, GetToggleTodoAction,
} from 'actionCreators/helloActionCreator'
import { Button, Icon, Row, Layout } from 'antd'
import './hello.less'
import Affix from 'component/affix/index'
import LiIcon from 'component/icon/icon'
import LiButton from 'component/button/index'
import { LiRow, LiCol } from '../component/grid/index'

const LiButtonGroup = LiButton.Group
const ButtonGroup = Button.Group
const Header = Layout.Header
const Content = Layout.Content
const Footer = Layout.Footer
const Sider = Layout.Sider

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

  private filterChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.filterVisibility(e.target.value)
  }

  private toggleTodo() {
    if (this.props.todos.length === 0) return
    this.props.toggleTodo(0)
  }

  private iconClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    console.log('liicon')
  }

  private mouseover: React.MouseEventHandler<HTMLElement> = (e) => {
    console.log('123')
  }

  private liButtonClick: React.MouseEventHandler<HTMLElement> = (e) => {
    this.setState({
      iconload: { delay: 2000 }
    })
  }

  public componentDidMount() {
    const tt = {
      k: 1,
      p: 2,
      d: 3
    }

    const res = pluck(tt, ['k', 'p', 'd'])

    const k: Partial<typeof tt> = {
      k: 12,
    }

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
            onChange={this.filterChanged} />

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
        <LiIcon type="bitian" onClick={this.iconClick} />

        {/* Button */}
        <LiButton
          loading={this.state.iconload}
          type="ghost"
          onClick={this.liButtonClick}>
          测试
        </LiButton>

        {/* button-group */}
        <LiButtonGroup size="small">
          <LiButton type="primary">测试1</LiButton>
          <LiButton type="primary"> 测试2</LiButton>
        </LiButtonGroup>

        <div className="hello-liRow">
          <Row type="flex" gutter={{ 'xl': 10, 'md': 20 }}>
            <div>测试行1</div>
            <div>测试行2</div>
          </Row>
        </div>

        {/* grid-row */}
        <div className="hello-liRow">
          <LiRow type="flex" gutter={{ 'xl': 10, 'md': 20 }} align="middle">
            <LiCol span={8}>测试行1</LiCol>
            <LiCol span={8}>测试行2</LiCol>
            <LiCol span={8}>测试行1</LiCol>
            <LiCol span={16}>测试行2</LiCol>
          </LiRow>
        </div>

        {/* layout组件 */}
        <Layout>
          <Header>头</Header>
          <Layout>
            <Sider>菜单</Sider>
            <Content>内容</Content>
          </Layout>
          <Footer>尾部</Footer>
        </Layout>
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

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

