import { createAction, handleActions, combineActions, handleAction } from 'redux-actions'

const defaultState = { counter: 10 }

const increment = createAction('INCREMENT', (amount = 1) => ({ amount: -amount }))

const decrement = createAction('DECREMENT', (amount = 1) => ({ amount }))
