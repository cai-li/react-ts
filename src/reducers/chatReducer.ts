import * as io from 'socket.io-client'
import { handleActions } from 'redux-actions'
import { ChatState } from 'store/state/chatState'
import User from 'model/user'
import {
  DisConnectActionPayload,
  IoConnectAction, DisConnectAction,
} from '../actions/chatAction'

type ChatPayload = DisConnectActionPayload

const initialState: ChatState = {
  ws: null,
}

export default handleActions<ChatState, ChatPayload>({
  [IoConnectAction.toString()]: (state, action) => {
    const url = location.hostname
    return {
      ws: io(`http://${url}:4848/`),
    }
  },
  [DisConnectAction.toString()]: (state, action) => {
    const { ws } = action.payload
    ws.disconnect()
    return {
      ws: null,
    }
  },
}, initialState)
