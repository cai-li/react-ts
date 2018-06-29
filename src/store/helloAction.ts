import Store from './index'
import { AnyAction } from 'redux'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export type HelloProps = any

export interface ItemTodo {
  text: string
  completed: boolean
}

export interface HelloState {
  todos: ItemTodo[]
  visibilityFilter: string
}

function ActionFun(type: string, payload: string | number): AnyAction {
  return { type, payload }
}

class HelloAction {
  constructor() {
  }

  /**
   * 新增一行数据（action的发起）
   * 
   * @param {string} payload 
   * @memberof HelloAction
   */
  public bindAddTodo(payload: string) {
    Store.dispatch(ActionFun(ADD_TODO, payload))
  }

  /**
   * 更改一行数据
   * 
   * @param {number} payload 
   * @memberof HelloAction
   */
  public bindToggleTodo(payload: number) {
    Store.dispatch(ActionFun(TOGGLE_TODO, payload))
  }
  /**
   * 
   * 
   * @param {string} payload 
   * @memberof HelloAction
   */
  public bindFilter(payload: string) {
    Store.dispatch(ActionFun(SET_VISIBILITY_FILTER, payload))
  }

  public bindOther(payload: string) {
    Store.dispatch(ActionFun('other', payload))
  }
}

export default new HelloAction()
