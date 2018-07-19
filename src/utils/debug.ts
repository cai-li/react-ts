import { deepclone } from 'utils/common'

const enum DebugLevel {
  log,
  warn,
  error,
}

export default class Debug {
  private prefix: string = ''
  private colorOffset: number = Math.random()
  private colorStep: number = 0

  constructor(prefix: string) {
    this.prefix = `[${prefix}] `
  }

  public colorCode(): string {
    const h = (this.colorOffset + ++this.colorStep) * 137
    const s = (0.65 + 0.2 * Math.random()) * 100
    const l = (0.7 + 0.2 * Math.random()) * 100

    return `hsl(${h}, ${s}%, ${l}%)`
  }

  public error(msg: string, ...payload: any[]) {
    this.debug(DebugLevel.error, msg, ...payload)
  }

  public warn(msg: string, ...payload: any[]) {
    this.debug(DebugLevel.warn, msg, ...payload)
  }

  public log(msg: string, ...payload: any[]) {
    this.debug(DebugLevel.log, msg, ...payload)
  }

  private debug(level: DebugLevel, msg: string, ...payload: any[]) {
    if (level === DebugLevel.error) return console.error(this.prefix + msg, ...payload)

    // todo 生产环境不打印log
    // if (ENV === 'product') return

    const detail = deepclone(payload)
    if (level === DebugLevel.warn) return console.warn(this.prefix + msg, ...detail)
    if (level === DebugLevel.log) return console.log(this.prefix + msg, ...detail)
  }
}