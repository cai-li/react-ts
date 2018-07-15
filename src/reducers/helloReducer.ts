import { handleActions } from 'redux-actions'
import { HelloState } from 'store/state/helloState'
import {
  VisibilityFilterPayload, AddTodoPayload, ToggleTodoPayload,
  VisibilityFilterAction, AddTodoAction, ToggleTodoAction,
} from 'actions/helloAction'

const initialState: HelloState = {
  todos: [],
  visibilityFilter: '',
}

type helloPayload = VisibilityFilterPayload & AddTodoPayload & ToggleTodoPayload

export default handleActions<HelloState, helloPayload>({
  [VisibilityFilterAction.toString()]: (state, action) => {
    return {
      ...state,
      visibilityFilter: action.payload.visibilityFilter,
    }
  },
  [AddTodoAction.toString()]: (state, action) => {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ],
    }
  },
  [ToggleTodoAction.toString()]: (state, action) => {
    return {
      ...state,
      todos: state.todos.map((item, index) =>
        action.payload.toggoleTodoIndex === index ?
          { text: item.text, completed: !item.completed } :
          item),
    }
  },
}, initialState)
