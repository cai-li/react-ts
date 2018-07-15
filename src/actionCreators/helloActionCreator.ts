import {
  VisibilityFilterPayload, AddTodoPayload, ToggleTodoPayload,
  VisibilityFilterAction, AddTodoAction, ToggleTodoAction,
} from 'actions/helloAction'

export function GetVisibilityFilterAction(visibilityFilter: string): ReduxActions.Action<VisibilityFilterPayload> {
  return VisibilityFilterAction(visibilityFilter)
}

export function GetAddTodoAction(text: string, complete: boolean): ReduxActions.Action<AddTodoPayload> {
  return AddTodoAction(text, complete)
}

export function GetToggleTodoAction(toggoleTodoIndex: number): ReduxActions.Action<ToggleTodoPayload> {
  return ToggleTodoAction(toggoleTodoIndex)
}