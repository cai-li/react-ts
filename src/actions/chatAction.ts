import { createAction } from 'redux-actions'

export interface DisConnectActionPayload {
  ws?: SocketIOClient.Socket
}

export const IoConnectAction =
  createAction('IoConnect', () => ({}))

export const DisConnectAction =
  createAction<DisConnectActionPayload, SocketIOClient.Socket>('DisConnectAction', (ws) => ({ ws }))
