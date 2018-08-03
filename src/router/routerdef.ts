export const enum RouteDef {
  // 根
  root = '#',

  // 404
  p404 = '404',

  // home
  home = 'home',

  // 功能列表
  primary = 'primary',

  // 其他
  other = 'other',

  // 测试demo
  demo = 'demo',

  // 表格
  table = 'table',

  // 图表
  chart = 'chart',

  // 编辑器
  editor = 'editor',

  // 聊天室
  chat = 'chat',

  // 关于界面
  about = 'about',

  // demo-hello
  hello = 'hello',

  // demo-context
  context = 'context',
}

export class Page {
  public name: string = ''
  public title: string = ''
  public children: Page[] = []
  public parent: Page = null
  public level: number = 0

  constructor(row: any) {
    Object.assign(this, row)
  }

  private static get root(): Page {
    return new Page({
      name: RouteDef.root,
      title: '',
    })
  }

  public traverseLink(root: Page = Page.root) {
    this.parent = root
    this.level = root.level + 1
    this.children.forEach((page: Page) => page.traverseLink(this))
  }
}

const Pages: Page[] = [
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
  }),
  new Page({
    name: RouteDef.demo,
    title: '测试demo',
    children: [
      new Page({
        name: RouteDef.hello,
        title: 'hello',
      }),
      new Page({
        name: RouteDef.context,
        title: 'context',
      }),
    ]
  }),
]

Pages.map((page: Page) => page.traverseLink())

export const PageMap = Pages