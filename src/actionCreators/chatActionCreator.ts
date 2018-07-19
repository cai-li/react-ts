import {
  DisConnectActionPayload,
  IoConnectAction, DisConnectAction,
} from 'actions/chatAction'

export function GetIoConnectAction(): ReduxActions.Action<{}> {
  return IoConnectAction()
}

export function GetdisConnectAction(ws: SocketIOClient.Socket): ReduxActions.Action<DisConnectActionPayload> {
  return DisConnectAction(ws)
}