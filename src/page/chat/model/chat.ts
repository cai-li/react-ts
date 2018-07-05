export interface User {
  id: string
  username: string
  online: boolean
}

export interface Record {
  id: string
  type: 'user' | 'system'
  name: string
  time: string
  isSelf?: boolean
  content: string
  src?: string
}

export interface ChatState {
  filter: string
  users: User[]
  recordList: Record[]
  count: number
  showIm: boolean
}
