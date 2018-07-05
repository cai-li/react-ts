import * as React from 'react'
import './chat.less'
import { Input, Icon, List, Avatar, Dropdown, Button } from 'antd'
import { ChatState, Record, User } from './model/chat'

const res = [
  {
    id: '1',
    username: '紫薇',
    online: true,
  },
  {
    id: '2',
    username: '尔康',
    online: false,
  },
  {
    id: '3',
    username: 'xiaoli',
    online: true,
  },
]

export default class Chat extends React.Component<ChatState> {
  public state: ChatState

  constructor(props: any) {
    super(props)
    this.state = {
      filter: '',
      users: [], // 所有在线用户
      recordList: [
        {
          id: '1',
          type: 'system',
          name: '紫薇',
          time: '2017-10-30 下午18:50:12',
          content: '加入了群聊',
        },
        {
          id: '2',
          type: 'system',
          name: '尔康',
          time: '2017-10-30 下午18:50:12',
          content: '加入了群聊',
        },
        {
          id: '3',
          type: 'user',
          name: '紫薇',
          time: '2017-10-30 下午18:50:12',
          isSelf: false,
          content: '山无棱天地合才敢与君绝',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
        {
          id: '4',
          type: 'user',
          name: '尔康',
          time: '2017-10-30 下午18:50:12',
          isSelf: true,
          content: '海可枯 石可烂 激情永不散',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
        {
          id: '5',
          type: 'user',
          name: '紫薇',
          time: '2017-10-30 下午18:50:12',
          isSelf: false,
          content: '山无棱天地合才敢与君绝',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
        {
          id: '6',
          type: 'user',
          name: '紫薇',
          time: '2017-10-30 下午18:50:12',
          isSelf: false,
          content: '山无棱天地合才敢与君绝',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
        {
          id: '7',
          type: 'user',
          name: '紫薇',
          time: '2017-10-30 下午18:50:12',
          isSelf: false,
          content: '山无棱天地合才敢与君绝',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
      ], // 聊天信息列表
      count: 0, // 当前在线人数
      showIm: false,
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
    return res.filter((user: User) => user.username.includes(this.state.filter))
  }

  /**
   * 所有在线用户
   *
   * @readonly
   * @private
   * @memberof Chat
   */
  private get onLineUser() {
    return res.filter((user: User) => user.online)
  }

  private filterChanged(filter: string) {
    this.setState({
      filter,
    })
  }

  private handleClear() {

  }

  private handleSubmit(e: Event) {

  }

  /**
   * 表情标签初始
   *
   * @private
   * @returns {React.ReactNode}
   * @memberof Chat
   */
  private initEmoji(): React.ReactNode {
    return <div>1222</div>
  }

  public render() {
    const { filter, recordList } = this.state

    return (
      <div className="pageChat">
        {/* 用户列表 */}
        <div className="pageChat-left">
          <Input
            placeholder="请输入关键字查询"
            value={filter}
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
              <div key={index} className={record.isSelf ? 'recordArea-item isRight' : 'recordArea-item'}>
                {record.type === 'system' ?
                  <div className="recordArea-item--system">
                    <p>系统消息：{record.name} {record.content} {record.time}</p>
                  </div> :
                  <div className="recordArea-item--user">
                    <Icon className="user-avatar" type="github" />
                    <div className="user-content">
                      {!record.isSelf && <p className="info">{record.name} {record.time}</p>}
                      <div className={record.isSelf ? 'arrow-left' : 'arrow-right'}></div>
                      <p className="content">{record.content}</p>
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
                onKeyUp={(e: any) => this.handleSubmit(e)} />
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
                onClick={(e: any) => this.handleSubmit(e)}
              >发送</Button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
