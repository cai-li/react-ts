import User from 'model/user'
import JwtService from 'services/jwtService'
import CacheService from 'services/cacheService'

class UserService {
  private user: User = null

  get current(): User | null {
    // TODO: should return a deep copy
    return this.user
  }

  set current(value: User) {
    this.user = value
  }

  async login(username: string, password: string): Promise<User> {
    this.user = new User({
      username,
      password
    })
    return this.user
  }

  async refresh(session: string): Promise<User> {
    const [jwt, user] = await this.reLoadJwt(session)
    this.user = new User(user)

    // 更新jwt
    JwtService.saveJwt(jwt)
    return this.user
  }

  async reLoadJwt(session: string): Promise<[string, any]> {
    CacheService.open(session)
    const jwt = JwtService.loadJwt()
    // todo 根据jwt去获取新的jwt
    const newjwt = 'new1223333u8dif87f7g'
    const user = {
      username: 'kk',
      password: '123213'
    }
    return [newjwt, user]
  }

  logout() {
    this.user = null
  }
}

export default new UserService()
