export class When {
  private source: any

  private constructor(source: any) {
    this.source = source
  }

  static check(source: any): When {
    return new When(source)
  }

  is(key: any, cb?: () => void) {
    const flag = key === this.source
    flag && cb && cb()
    return flag
  }

  within(allows: any[], cb?: () => void) {
    const flag = allows.includes(this.source)
    flag && cb && cb()
    return flag
  }
}

/** 
 * 标准数字格式检测
 */
const NUMBER_REGEX = /[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?/

/**
 * 格式化数字，保留指定位数
 * 
 * @export
 * @param {(number | string)} num 需要格式化的数据
 * @param {number} [digits=2] 需要保留的小数位数
 * @returns 格式化后的数字
 */
export function trimNum(num: number | string, digits: number = 2): number {
  let n = 0

  if (typeof num === 'number') {
    n = num
  } else if (typeof num === 'string') {
    const parsed = num.replace(/,/g, '')

    // 检测形如'-1.2345'的标准数字格式
    if (NUMBER_REGEX.test(parsed)) {
      n = parseFloat(parsed)
      if (isNaN(n)) return 0
    } else {
      return 0
    }
  } else {
    return 0
  }

  const multi = Math.pow(10, digits)
  return Math.round(n * multi) / multi
}

/**
 * 检测指定字符串是否符合标准的数字格式
 * 
 * @export
 * @param {string | number} input 需要检测的字符串
 * @returns {boolean} 检测结果
 */
export function isNumberAlike(input: string | number): boolean {
  const w = input.toString()
  const result = NUMBER_REGEX.exec(w)
  return result != null && result[0] === w
}

/**
 * 根据源对象及需要保留的属性名称，返回一个经过裁剪后的新对象
 * 
 * @export
 * @param {{ [key: string]: any }} obj 需要裁剪的源对象
 * @param {string[]} keeps 需要保留的属性名称数组
 * @returns {{ [key: string]: any }} 裁剪过后的新对象
 */
export function prune(obj: { [key: string]: any }, keeps: string[]): { [key: string]: any } {
  return keeps.reduce((result, attr) => Object.assign(result, { [attr]: obj[attr] }), {})
}

/**
 * 简单深拷贝
 * 
 * @export
 * @template T 对象类型
 * @param {T} data 能够被JSON化并还原的任意数据结构
 * @returns {T} 深拷贝对象
 */
export function deepclone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 查找并删除数组中的指定元素
 * 
 * 注：该方法会更改传入的数组本身
 * 
 * @export
 * @template T 数组元素类型
 * @param {T[]} array 需要操作的数组
 * @param {(value: T, index: number) => boolean} predicate 查找指定元素的断言
 */
export function findNdelete<T>(array: T[], predicate: (value: T, index: number) => boolean) {
  const index = array.findIndex(predicate)
  index !== -1 && array.splice(index, 1)
}

/**
 * 查找并替换数组中的指定元素
 * 
 * 注：该方法会更改传入的数组本身
 * 
 * @export
 * @template T 数组元素类型
 * @param {T[]} array 需要操作的数组
 * @param {T} source 用于替换的元素
 * @param {(value: T, index: number) => boolean} predicate 查找指定元素的断言
 */
export function findNreplace<T>(array: T[], source: T, predicate: (value: T, index: number) => boolean) {
  const index = array.findIndex(predicate)
  index !== -1 && array.splice(index, 1, source)
}

/**
 * 树节点描述接口
 * 
 * @interface TreeNode
 * @template T 数据对象的类型
 */
interface TreeNode<T> {
  children?: T[]
}

/**
 * 树的深度优先递归迭代器
 * 
 * @export
 * @template T 节点数据类型
 * @param {T} node 指定的节点
 */
export function* treeWalker<T extends TreeNode<T> = any>(node: T):any {
  yield node

  if (!Array.isArray(node.children)) return

  for (const n of node.children) {
    yield* treeWalker(n)
  }
}

/**
 * 将树平铺为数组
 * 
 * 使用深度优先递归顺序展开
 * 
 * @export
 * @template T 节点数据类型
 * @param {T} node 指定的节点
 * @returns {T[]} 展开后的数组
 */
export function flattenTree<T extends TreeNode<T> = any>(node: T): T[] {
  return Array.from(treeWalker(node))
}

/**
 * 在类树节点中查找值
 * 
 * 使用深度优先递归查询
 * 
 * @export
 * @template T 节点数据类型
 * @param {T[]} nodes 节点数组 
 * @param {(node: T) => boolean} predicate 判断节点是否符合条件的断言
 * @param {string} [attr='children'] 子节点所在属性的名称
 * @returns {(T | undefined)} 第一个符合断言的节点，如果没有则返回undefined
 */
export function findInTree<T extends TreeNode<T> = any>(nodes: T[], predicate: (node: T) => boolean): T | undefined {
  for (const node of nodes) {
    if (predicate(node)) return node

    if (Array.isArray(node.children) && node.children.length !== 0) {
      const target = findInTree(node.children, predicate)
      if (target !== void 0) return target
    }
  }
}

/**
 * 生成指定位数的随机字母标识
 * @param {number} length 标识长度，默认8位
 * @returns {string} 生成结果
 */
export function idGen(length: number = 8): string {
  let s = ''
  while (length-- > 0) {
    var r = Math.floor(Math.random() * 26) + 97
    s = s + String.fromCharCode(r)
  }
  return s
}

/**
 * 简单版本的对象值覆写
 * 
 * @export
 * @param {{}} source 需要被覆写的对象
 * @param {{}} target 覆写值所在的对象
 * @returns {{}} 处理后的源对象
 */
export function assign<T, U>(source: T, target: U): T & U {
  Object.keys(target).forEach(key => {
    target[key] !== void 0 && (source[key] = target[key])
  })

  return source as T & U
}

/**
 * 根据指定字段将数组转成object map的简易方法
 * 
 * @export
 * @template T 数组对象类型
 * @param {T[]} arr 需要转换的数组
 * @param {(item: T) => string} keyFn 生成map key的方法，根据遍历传入的数组对象返回生成到最终对象的字段内容
 * @returns {{[key: string]: T}} 生成的Map
 *
 * @example
 *    let a = [{name: 'foo', value: 1}];
 * 
 *    let b = arr2map(a, item => item.name);
 * 
 *    // b => { foo: { name: 'foo', value: 1 } }
 */
export function arr2map<T>(arr: T[], keyFn: (item: T) => string): { [key: string]: T } {
  return arr.reduce((obj, item) => Object.assign(obj, { [keyFn(item)]: item }), {})
}

/**
 * 将指定对象的值转换为数组
 * 
 * @export
 * @template T 值的类型
 * @param {{ [key: string]: T }} obj 需要转换的对象
 * @returns {T[]} 值数组
 */
export function map2arr<T>(obj: { [key: string]: T }): T[] {
  return Object.keys(obj).map(key => obj[key])
}

/**
 * 将指定对象转换成FormData
 * @param {Object} obj 需要转换的对象
 * @return {FormData} 转换后的FormData
 */
export function obj2FormData(obj: { [key: string]: any }): FormData {
  let fd = new FormData()

  for (const key in obj) {
    fd.append(key, obj[key])
  }

  return fd
}

/**
 * 通过指定字段路径获取对象上的某个值
 * 
 * @export
 * @template T 值的类型
 * @param {{ [key: string]: any }} obj 源对象
 * @param {string} path 字段路径，形如"a.b"，返回obj.a.b
 * @returns {T} 返回值
 */
export function getByPath<T = any>(obj: { [key: string]: any }, path: string): T {
  if (path === '' || path === void 0) return void 0

  function recursiveGet<T>(obj: any, arr: string[]): T {
    if (obj === void 0) return void 0

    const child = obj[arr[0]] as T
    return arr.length !== 1
      ? recursiveGet(child, arr.slice(1))
      : child
  }

  const pathArr = path.split('.')
  return recursiveGet<T>(obj, pathArr)
}

/**
 * 从对象数组中获取某个字段的合计值
 * 
 * @export
 * @template T 对象类型
 * @template any 默认类型
 * @param {T[]} arr 对象数组
 * @param {string} prop 字段路径
 * @param {number} [digits=2] 需要保留的小数位数
 * @returns {number} 合计值
 */
export function sum<T = any>(arr: T[], prop: string, digits: number = 2): number {
  return trimNum(arr.reduce((sum, item) => sum + trimNum(getByPath(item, prop)), 0), digits)
}

/**
 * 根据给定的条件返回经过过滤的数组
 * 
 * 数组元素中可包含tuple[boolean, T]，若tuple[0]为真值，则tuple[1]会包含在结果数组中；
 * 若数组元素为T，则直接进入结果数组中；
 * 
 * @export
 * @template T 数组元素的类型
 * @param {((T | [boolean, T])[])} items 需要被过滤的数组，元素类型可为T，或者为[boolean, T]的tuple
 * @returns {T[]} 经过过滤的仅包含类型T元素的数组
 */
export function filter<T>(items: (T | [boolean, T])[]): T[] {
  return items.reduce((results, item) => {
    if (!Array.isArray(item)) {
      return results.concat(item)
    } else if (item[0]) {
      return results.concat(item[1])
    } else {
      return results
    }
  }, [])
}