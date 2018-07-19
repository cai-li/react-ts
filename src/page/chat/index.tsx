import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from 'store/storeState'
import { GetIoConnectAction, GetdisConnectAction } from 'actionCreators/chatActionCreator'
import { Input, Icon, List, Avatar, Dropdown, Button } from 'antd'
import { idGen } from 'utils/common'
import User from 'model/user'
import UserService from 'services/userService'
import ChatService, { MessageParam } from './chatService'
import { ChatState, Record } from './typeModel/chat'
import './chat.less'

interface ChatProps {
  ws?: SocketIOClient.Socket
  ioConnect?: () => void
  ioDisconnect?: (ws: SocketIOClient.Socket) => void
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Chat extends React.Component<ChatProps, ChatState> {
  public state: ChatState

  constructor(props: ChatProps) {
    super(props)
    this.state = {
      userFilter: '',
      chatUsers: [],
      recordList: [],
      showIm: false,
      message: '',
    }
  }

  /**
   * 左侧显示的用户列表
   *
   * @readonly
   * @private
   * @memberof Chat
   */
  private get usersTem() {
    return this.state.chatUsers.filter((user: User) => user.username.includes(this.state.userFilter))
  }

  /**
   * 所有在线用户
   *
   * @readonly
   * @private
   * @memberof Chat
   */
  private get onLineUser() {
    return this.state.chatUsers.filter((user: User) => user.online)
  }

  private filterChanged(userFilter: string) {
    this.setState({
      userFilter,
    })
  }

  private handleClear() {
    // todo
    const k = 'todo'
  }

  private async handleSubmit(e?: React.KeyboardEvent<HTMLTextAreaElement>) {
    const message = this.state.message.trim()
    const messageId = idGen()
    if (message === '' || (e && e.keyCode !== 13)) return

    try {
      await ChatService.sendMsg(this.props.ws, messageId, message)
      const newMsg = new Record({
        id: messageId,
        type: 'user',
        name: UserService.current.username,
        isSelf: true,
        content: message,
        state: false,
      })

      this.setState({
        recordList: this.state.recordList.concat(newMsg),
      })

      this.setState({
        message: '',
      })
    } catch (e) {
      console.log('服务错误：', e)
    }
  }

  private CalChatUser(users: string[]) {
    const chatUsers = users.map((user) => new User({
      username: user,
      online: true,
    }))

    this.setState({
      chatUsers,
    })
  }

  private calUserMsg(name: string, msgObj: MessageParam) {
    const time = moment().format()

    if (name === UserService.current.username) {
      const recordList = this.state.recordList.map((record) => {
        if (record.id === msgObj.msgId) {
          record.time = time
          record.state = true
        }
        return record
      })

      this.setState({
        recordList,
      })
    } else {
      const newMsg = new Record({
        id: msgObj.msgId,
        type: 'user',
        name,
        isSelf: name === UserService.current.username,
        time,
        content: msgObj.msg,
        state: true,
      })
      this.setState({
        recordList: this.state.recordList.concat(newMsg),
      })
    }

  }

  private calMsgs(name: string, state: 'login' | 'logout', msg: string = '') {
    const type = 'system'
    const id = idGen()
    const time = moment().format()
    let content = ''
    if (state === 'login') {
      content = '加入了群聊'
    } else if (state === 'logout') {
      content = '离开了群聊'
    } else {
      content = msg
    }

    const newMsg = new Record({
      id,
      type,
      name,
      time,
      isSelf: name === UserService.current.username,
      content,
      state: true,
    })

    this.setState({
      recordList: this.state.recordList.concat(newMsg),
    })
  }

  private async loadChat(): Promise<any> {
    const { ws } = this.props
    try {
      await ChatService.enterChat(ws, UserService.current.username)
    } catch (e) {
      console.log('服务错误：', e)
    }
  }

  public async componentDidMount() {
    await this.props.ioConnect()
    await this.loadChat()
    const { ws } = this.props

    // 测试是否连接上websocket
    ws.on('connect', () => console.log('连接web服务器成功'))

    // socket监听
    ws.on('enterChatSuccess', (nickName: string, users: string[]) => {
      console.log('进入聊天室:', users)
    })

    // 系统消息
    ws.on('system', (nickName: string, users: string[], state: 'login' | 'logout') => {
      console.log('系统消息:', nickName, state)
      this.CalChatUser(users)
      this.calMsgs(nickName, state)
    })

    // 用户名重名
    ws.on('nickExisted', (nickName: string, users: any) => {
      console.log('登录用户名重复，请重新登录设置不同的用户名')
    })

    // 聊天信息
    ws.on('newMsg', (nickName: string, msg: MessageParam) => {
      console.log('聊天信息：', msg)
      this.calUserMsg(nickName, msg)
    })

    // 聊天表情
    ws.on('newImg', (nickName: string, imgData: any) => {
      console.log('聊天表情:', imgData)
    })
  }

  public componentWillUnmount() {
    this.props.ioDisconnect(this.props.ws)
  }

  private faceClick(item: string) {

  }

  /**
   * 表情标签初始
   *
   * @private
   * @returns {React.ReactNode}
   * @memberof Chat
   */
  private initEmoji(): React.ReactNode {
    const emojis = []
    const url = location.href.split('#')[0]
    for (let i = 1; i < 70; i++) {
      emojis.push(i + '')
    }
    return (
      <div className="pageChat-emojis" id="emojis">
        {
          emojis.map((item) =>
            <span
              key={item}
              title={item}
              className="face"
              onClick={() => this.faceClick(item)}
            ><img src={`${url}asset/emoji/${item}.gif`} />
            </span>)
        }
      </div>
    )
  }

  public render() {
    const { userFilter, recordList } = this.state
    return (
      <div className="pageChat">
        {/* 用户列表 */}
        <div className="pageChat-left">
          <Input
            placeholder="请输入关键字查询"
            value={userFilter}
            onChange={(e: any) => this.filterChanged(e.target.value)} />
          <div className="userList">
            <List
              locale={{ emptyText: '没有匹配的人员' }}
              itemLayout="horizontal"
              dataSource={this.usersTem}
              renderItem={(user: User) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={user.username}
                    description={user.online ? '在线' : '不在线'}
                  />
                </List.Item>
              )} />
          </div>
        </div>

        {/* 内容区域 */}
        <div className="pageChat-right">
          <div className="onlineUserNum">当前在线人数：<span>{this.onLineUser.length}</span></div>
          <div className="recordArea">
            {recordList.map((record: Record, index) =>
              <div
                key={index}
                className={record.isSelf && record.type === 'user' ? 'recordArea-item isRight' : 'recordArea-item'}>
                {record.type === 'system' ?
                  <div className="recordArea-item--system">
                    <p>系统消息：{record.name} {record.content} {record.time}</p>
                  </div> :
                  <div className="recordArea-item--user">
                    <Icon className="user-avatar" type="github" />
                    <div className="user-content">

                      {!record.isSelf && <p className="info">{record.name} {record.time}</p>}
                      <div className={record.isSelf ? 'arrow-left' : 'arrow-right'}></div>
                      <p className="content">{!record.state && <span>!</span>}{record.content}</p>
                    </div>
                  </div>}
              </div>,
            )}
          </div>

          {/* 消息发送区域 */}
          <div className="sendArea">
            <div className="sendArea-tool">
              <span className="tools tools-face" title="表情">
                <Dropdown overlay={this.initEmoji()} placement="topLeft" trigger={['click']}>
                  <Icon type="smile-o" />
                </Dropdown>
              </span>
              <span className="tools tools-img" title="发送图片"><Icon type="picture" /></span>
              <span className="tools tools-clear" title="清空聊天记录">
                <Icon type="minus-circle-o" onClick={() => this.handleClear()} />
              </span>
            </div>

            <div className="sendArea-msg">
              <Input.TextArea
                placeholder="在这里输入信息"
                value={this.state.message}
                onChange={(e: any) => {
                  this.setState({ message: e.target.value })
                }}
                onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => this.handleSubmit(e)} />
            </div>

            <div className="sendArea-send">
              <Button
                type="default"
                size="default"
                className="send"
                onClick={() => this.setState({ showIm: false })}
              >关闭</Button>

              <Button
                type="primary"
                size="default"
                className="send"
                onClick={() => this.handleSubmit()}
              >发送</Button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

function mapStateToProps(state: StoreState): ChatProps {
  return {
    ws: state.chatProps.ws,
  }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): ChatProps {
  return {
    ioConnect: () => dispatch(GetIoConnectAction()),
    ioDisconnect: (ws: SocketIOClient.Socket) => dispatch(GetdisConnectAction(ws)),
  }
}
