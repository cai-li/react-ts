import * as io from 'socket.io-client'
import User from 'model/user'

/**
 * 由于缺乏真正的数据库，无法通过用户id作为唯一键值
 * 
 * @class ChatService
 */
class ChatService {
  private ws: SocketIOClient.Socket = null
  public chatUsers: User[] = []

  public async connect(): Promise<void> {
    // todo 需要根据开发环境隐射对应服务ip
    const url = location.hostname
    this.ws = io(`http://${url}:4848/`)

    // 测试是否连接上websocket
    this.ws.on('connect', () => console.log('连接web服务器成功'))

    // 进入聊天室
    this.ws.on('enterChatSuccess', (nickName: string, users: string[]) => {
      console.log('进入聊天室:', users)
      this.chatUsers = users.map((user) => new User({
        username: user,
        online: true,
      }))
    })

    // 系统消息
    this.ws.on('system', (nickname: string, users: any, state: 'login' | 'logout') => {
      console.log('系统消息:', users, state)
    })

    // 用户名重名
    this.ws.on('nickExisted', (nickName: string, users: any) => {
      console.log('登录用户名重复，请重新登录设置不同的用户名')
    })

    // 聊天信息
    this.ws.on('newMsg', (nickName: string, msg: string) => {
      console.log('聊天信息：', msg)
    })

    // 聊天表情
    this.ws.on('newImg', (nickName: string, imgData: any) => {
      console.log('聊天表情:', imgData)
    })
  }

  /**
   * 进入聊天室
   *
   * @param {string} user
   * @memberof ChatService
   */
  public async enterChat(user: string) {
    this.emitHandle('enterChat', user)
    return this.chatUsers
  }

  /**
   * 离开聊天室
   *
   * @memberof ChatService
   */
  public async leaveChat() {
    this.ws.disconnect()
    this.chatUsers = []
  }

  /**
   * 发送信息
   *
   * @param {string} msg
   * @memberof ChatService
   */
  public async sendMsg(msg: string) {
    this.emitHandle('postMsg', msg)
  }

  /**
   * 发送图片
   *
   * @param {*} imgData
   * @memberof ChatService
   */
  public async sendImg(imgData: any) {
    this.emitHandle('postImg', imgData)
  }

  /**
   * socket.io的emit事件
   *
   * @param {string} event
   * @param {*} [payload]
   * @memberof ChatService
   */
  public async emitHandle(event: string, payload?: any) {
    if (!this.ws) return
    this.ws.emit(event, payload)
  }

}

export default new ChatService()
