import { combineReducers } from 'redux'

import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './helloAction'

interface ActionType {
  type: any,
  [name: string]: any
}

export interface HelloProps {
  [name:string]:any
}

export interface ItemTodo {
  text: string
  completed: boolean
}

export interface HelloState {
  todos: ItemTodo[]
  visibilityFilter: string
}

const initialState: HelloState = {
  todos: [
    { text: 'caili', completed: false }
  ],
  visibilityFilter: 'show-all',
}

function visibilityFilter(state: string = initialState.visibilityFilter, action: ActionType) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state: ItemTodo[] = initialState.todos, action: ActionType) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) =>
        action.index === index ?
          { text: todo.text, completed: !todo.completed } :
          todo,
      )
    default:
      return state
  }
}

export const reducer = combineReducers({ visibilityFilter, todos })
