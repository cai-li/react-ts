import { HelloState } from './state/helloState'

export interface StoreState {
  readonly helloCount: HelloState
}
