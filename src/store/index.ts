import { createStore } from 'redux'
import { HelloReducer } from './helloreducer'

const Store = createStore(HelloReducer)

export default Store