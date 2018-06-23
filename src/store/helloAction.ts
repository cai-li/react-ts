import Store from './index'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

class HelloAction {
  constructor() {
  }

  /**
   * 返回action
   * 
   * @param {string} type 执行动作
   * @param {(string | number)} param 数据参数
   * @returns action 将数据传到store的荷载
   * @memberof HelloAction
   */
  public ActionFun(type: string, param: string | number) {
    return { type, param }
  }


  /**
   * 新增一行数据（action的发起）
   * 
   * @param {string} text 
   * @memberof HelloAction
   */
  public bindAddTodo(text: string) {
    Store.dispatch(this.ActionFun(ADD_TODO, text))
  }

  /**
   * 更改一行数据
   * 
   * @param {number} index 
   * @memberof HelloAction
   */
  public bindToggleTodo(index: number) {
    Store.dispatch(this.ActionFun(TOGGLE_TODO, index))
  }
  /**
   * 
   * 
   * @param {string} text 
   * @memberof HelloAction
   */
  public bindFilter(text: string) {
    Store.dispatch(this.ActionFun(SET_VISIBILITY_FILTER, text))
  }

  public bindOther(text: string) {
    Store.dispatch(this.ActionFun('other', text))
  }
}

export default new HelloAction()
