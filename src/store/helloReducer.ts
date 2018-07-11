import { combineReducers, AnyAction} from 'redux'

import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './helloAction'

interface ItemTodo {
  text: string
  completed: boolean
}

const initialState = {
  todos: [
    { text: 'caili', completed: false },
  ],
  visibilityFilter: '',
}

function visibilityFilter(state: string = initialState.visibilityFilter, action: AnyAction) {
  const { type, payload } = action
  switch (type) {
    case SET_VISIBILITY_FILTER:
      return payload
    default:
      return state
  }
}

function todos(state: ItemTodo[] = initialState.todos, action: AnyAction) {
  const { type, payload } = action
  switch (type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: payload,
          completed: false,
        },
      ]
    case TOGGLE_TODO:
      return state.map((item, index) =>
        payload === index ?
          { text: item.text, completed: !item.completed } :
          item,
      )
    default:
      return state
  }
}

export const HelloReducer = combineReducers({ visibilityFilter, todos })
