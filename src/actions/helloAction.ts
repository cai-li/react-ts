import { createAction } from 'redux-actions'

export interface VisibilityFilterPayload {
  visibilityFilter: string
}

export interface AddTodoPayload {
  text: string,
  completed: boolean,
}

export interface ToggleTodoPayload {
  toggoleTodoIndex: number
}

export const VisibilityFilterAction =
  createAction<VisibilityFilterPayload, string>('VisibilityFilterAction', (visibilityFilter) => ({ visibilityFilter }))

export const AddTodoAction =
  createAction<AddTodoPayload, string, boolean>('AddTodoAction', (text, completed) => ({ text, completed }))

export const ToggleTodoAction =
  createAction<ToggleTodoPayload, number>('ToggleTodoAction', (toggoleTodoIndex) => ({ toggoleTodoIndex }))
