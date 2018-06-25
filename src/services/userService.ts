import User from 'model/user'
import JwtService from 'services/jwtService'
import CacheService from 'services/cacheService'
import WsService from 'services/wsService'

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
    this.user = new User(await WsService.connect(username,password))
    return this.user
  }

  async refresh(session: string): Promise<User> {
    this.user = new User(await WsService.refresh(session))
    return this.user
  }

  logout() {
    this.user = null
  }
}

export default new UserService()
