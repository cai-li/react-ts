import User from 'model/user'

export class Record {
  public id: string = ''
  public type: 'user' | 'system' | 'img'
  public name: string = ''
  public time: string = ''
  public isSelf?: boolean = false
  public content: string = ''
  public src?: string = ''
  public state?: boolean = false

  constructor(row: any = {}) {
    Object.assign(this, row)
  }
}

export interface ChatState {
  /**
   * 用户筛选项
   *
   * @type {string}
   * @memberof ChatState
   */
  userFilter: string
  /**
   * 所有在线用户
   *
   * @type {User[]}
   * @memberof ChatState
   */
  chatUsers: User[]

  /**
   * 聊天信息列表
   *
   * @type {Record[]}
   * @memberof ChatState
   */
  recordList: Record[]

  /**
   *
   *
   * @type {boolean}
   * @memberof ChatState
   */
  showIm: boolean

  /**
   * 当前发送的消息
   *
   * @type {string}
   * @memberof ChatState
   */
  message: string
}
