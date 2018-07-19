interface ItemTodo {
  text: string
  completed: boolean
}

export interface HelloState {
  todos: ItemTodo[]
  visibilityFilter: string
}
