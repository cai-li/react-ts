import * as io from 'socket.io-client'
import User from 'model/user'
import { Record } from './typeModel/chat'

interface WsPackage {
  error: string
  body?: any
}

export interface MessageParam {
  msgId: string
  msg: string
}

/**
 * 由于缺乏真正的数据库，无法通过用户id作为唯一键值
 * 
 * @class ChatService
 */
class ChatService {
  /**
   * 进入聊天室
   *
   * @param {string} user
   * @memberof ChatService
   */
  public async enterChat(ws: SocketIOClient.Socket, user: string) {
    this.emitHandle(ws, 'enterChat', user)
  }

  /**
   * 发送信息
   *
   * @param {string} msg
   * @memberof ChatService
   */
  public async sendMsg(ws: SocketIOClient.Socket, msgId: string, msg: string) {
    this.emitHandle(ws, 'postMsg', {
      msgId,
      msg,
    })
  }

  /**
   * 发送图片
   *
   * @param {*} imgData
   * @memberof ChatService
   */
  public async sendImg(ws: SocketIOClient.Socket, imgData: MessageParam) {
    this.emitHandle(ws, 'postImg', imgData)
  }

  /**
   * socket.io的emit事件
   *
   * @param {string} event
   * @param {*} [payload]
   * @memberof ChatService
   */
  public async emitHandle(
    ws: SocketIOClient.Socket,
    event: string,
    payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      ws.emit(event, payload, (ack: WsPackage) => {
        if (ack.error !== void 0) {
          resolve(ack)
        } else {
          reject(ack)
        }
      })
    })
  }
}

export default new ChatService()
