import { HelloState } from './state/helloState'
import { ChatState } from './state/chatState'

export interface StoreState {
  readonly helloCount: HelloState
  readonly chatProps: ChatState
}
