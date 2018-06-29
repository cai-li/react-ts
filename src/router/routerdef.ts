export const enum RouteDef {
  root = '#',

  p404 = '404',

  home = 'home',

  primary = 'primary',

  other = 'other',

  table= 'table',

  chart = 'chart',

  chat = 'chat',

  editor = 'editor',

  // 关于界面
  about = 'about',

  //
  hello = 'hello'
}

class Page {
  name: string = ''
  title: string = ''
  children: Page[] = []
  parent: Page = null
  level: number = 0

  constructor(row: any) {
    Object.assign(this, row)
  }

  static get root(): Page {
    return new Page({
      name: RouteDef.root,
      title: ''
    })
  }

  traverseLink(root: Page = Page.root) {
    this.parent = root
    this.level = root.level + 1
    this.children.forEach((page: Page) => page.traverseLink(this))
  }
}

const Pages: Page[]= [
  new Page({
    name: RouteDef.primary,
    title: '功能列表',
    children: [
      new Page({
        name: RouteDef.table,
        title: '表格',
      }),
      new Page({
        name: RouteDef.chart,
        title: '图表',
      }),
      new Page({
        name: RouteDef.editor,
        title: '编辑器',
      }),
    ]
  }),
  new Page({
    name: RouteDef.other,
    title: '其他',
    children: [
      new Page({
        name: RouteDef.chat,
        title: '聊天室',
      }),
    ]
  })
]

Pages.map((page: Page) => page.traverseLink())

export const PageMap = Pages