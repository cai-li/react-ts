import User from 'model/user'
import JwtService from 'services/jwtService'
import CacheService from 'services/cacheService'
import WsService from 'services/wsService'

class UserService {
  private user: User = null

  public get current(): User | null {
    // TODO: should return a deep copy
    return this.user
  }

  public set current(value: User) {
    this.user = value
  }

  public async login(username: string, password: string): Promise<User> {
    this.user = new User(await WsService.connect(username,password))
    return this.user
  }

  public async refresh(session: string): Promise<User> {
    this.user = new User(await WsService.refresh(session))
    return this.user
  }

  public logout() {
    this.user = null
  }
}

export default new UserService()
