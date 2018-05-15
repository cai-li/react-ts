import Store from './index'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

function Add_Todo(text: string) {
  return { type: ADD_TODO, text }
}

function TOGGLE_Todo(index: number) {
  return { type: TOGGLE_TODO, index }
}

function SetVisibilityFilter(filter: string) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

function other(filter: string) {
  return { type: other, filter }
}

export const bindAddTodo = (text: string) => Store.dispatch(Add_Todo(text))
export const bindToggleTodo = (text: number) => Store.dispatch(TOGGLE_Todo(text))
export const bindFilter = (text: string) => Store.dispatch(SetVisibilityFilter(text))
export const bindOther = (text: string) => Store.dispatch(other(text))
