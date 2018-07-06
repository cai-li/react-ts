import User from 'model/user'
import * as io from 'socket.io-client'
import Debug from 'utils/debug'
import CacheService from 'services/cacheService'
import JwtService from 'services/jwtService'

const TIMEOUT = 1000 * 30
const RESPONSE_TIMEOUT = '请求超时，请刷新页面重试。若频繁发生此错误，请联系技术支持人员。'
const RESPONSE_DUPLICATE_REQUEST = '该请求正在处理中，请耐心等待。'

interface WsPackage {
  error: string,
  body?: any
}

class WsService {
  private ws: SocketIOClient.Socket
  private debug: Debug = new Debug('WebSocket')
  private queue: Set<string> = new Set() // 请求队列

  public connect() {
    // todo 需要根据开发环境隐射对应服务ip
    const url = location.hostname
    this.ws = io(`http://${url}:1111/`)

    // 测试是否连接上websocket
    this.ws.on('connect', () => console.log('连接web服务器成功'))
  }

  public async login(username: string, password: string): Promise<any> {

    // todo 请求数据的主体暂时忽略，上顶死数据
    const user = new User({
      username,
      password
    })

    const jwt = 'kerii34234234mdfk8s99dssf'

    CacheService.open(user.id)
    await JwtService.saveJwt(jwt)

    return user
  }

  public async refresh(session: string) {
    CacheService.open(session)

    // todo 根据jwt去获取新的jwt,根据新的jwt获取user
    const newjwt = 'new1223333u8dif87f7g'
    const user = {
      username: 'kk',
      password: '123213'
    }
    await JwtService.saveJwt(newjwt)

    return user
  }

  public send(event: string, payload: any): Promise<any> {
    return this.sendInternal(this.ws, event, payload)
  }

  private async sendInternal<T = any>(
    ws: SocketIOClient.Socket,
    event: string,
    payload: any,
    api: string = '',
    timeout: number = TIMEOUT,
  ): Promise<T> {
    const colorCode = this.debug.colorCode()
    const timestamp = Date.now()
    let isSuccess = true
    let logPayload

    try {
      this.logTraffic('log', 'out', colorCode, api, payload)
      if (this.queue.has(event)) {
        throw RESPONSE_DUPLICATE_REQUEST
      } else {
        this.queue.add(event)
        return logPayload = await Promise.race([
          this.timeoutCounter(timeout),
          this.sendHandler(ws, event, payload),
        ])
      }
    } catch (error) {
      isSuccess = false, logPayload = error
      throw new Error(error)
    } finally {
      const interval = Date.now() - timestamp

      this.logTraffic(isSuccess ? 'log' : 'error', 'in', colorCode, api, logPayload, interval)
      this.queue.delete(event)
    }
  }

  /**
   * 请求超时处理
   *
   * @private
   * @param {number} timeout
   * @returns
   * @memberof WsService
   */
  private timeoutCounter(timeout: number) {
    return new Promise((resolve, reject) => setTimeout(() =>
      reject(RESPONSE_TIMEOUT),
      timeout,
    ))
  }

  /**
   * 发送请求事件
   *
   * @param {SocketIOClient.Socket} ws
   * @param {string} event
   * @param {*} payload
   * @returns {Promise<any>}
   * @memberof WsService
   */
  public async sendHandler(
    ws: SocketIOClient.Socket,
    event: string,
    payload: any,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ws.emit(event, payload, (ack: WsPackage) =>
        ack.error === void 0 ?
          resolve(ack.body) :
          reject(ack))
    })
  }

  public disconnect() {
    this.ws.disconnect()
    JwtService.clearJwt()
    CacheService.clear()
    CacheService.close()
  }

  private logTraffic(
    type: 'log' | 'warn' | 'error',
    direction: 'in' | 'out',
    colorCode: string,
    api: string,
    payload: any,
    timestamp: number = 0,
  ) {
    const flatQueue = `[${Array.from(this.queue).map((query) => ` "${query}",`)} ]`
    const legend = '  '
    const prefix = direction === 'in' ? '<=' : '=>'
    const interval = timestamp !== 0 ? `- ${timestamp}ms` : ''
    const index = `background-color: ${colorCode}`
    const font = 'font-weight: bold'

    this.debug[type](`${flatQueue}\r\n%c${legend}%c ${prefix} %c${api} ${interval}\r\n`, index, '', font, payload)
  }
}

export default new WsService()