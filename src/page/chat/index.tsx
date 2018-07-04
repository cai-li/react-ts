import * as React from 'react'
import './chat.less'
import { Input, Icon, List, Avatar } from 'antd'
import { ChatState, Record, User } from './model/chat'

export default class Chat extends React.Component<any, ChatState> {
  public state: ChatState

  constructor(props: any) {
    super(props)
    this.state = {
      filter: '',
      users: [], // 所有在线用户
      recordList: [
        {
          id: '1',
          type: 'user',
          name: '紫薇',
          time: '2017-10-30 18:50:12',
          isSelf: false,
          content: '山无棱天地合才敢与君绝',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
        {
          id: '2',
          type: 'user',
          name: '尔康',
          time: '2017-10-30 18:50:12',
          isSelf: true,
          content: '海可枯 石可烂 激情永不散',
          src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        },
        {
          id: '3',
          type: 'system',
          name: 'xiaoli',
          time: '2017-10-30 18:50:12',
          content: '加入了群聊',
        },
      ], // 聊天信息列表
      count: 0, // 当前在线人数
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
    const res = [
      {
        id: '1',
        username: '紫薇',
        online: true,
      },
      {
        id: '2',
        username: '尔康',
        online: true,
      },
      {
        id: '3',
        username: 'xiaoli',
        online: true,
      },
    ]
    return res.filter((user: User) => user.username.includes(this.state.filter))
  }

  private filterChanged(filter: string) {
    this.setState({
      filter,
    })
  }

  public render() {
    const { filter } = this.state

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
              locale={{emptyText: '没有匹配的人员'}}
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

        </div>
      </div >
    )
  }
}
