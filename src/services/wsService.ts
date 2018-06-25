import User from 'model/user'
import CacheService from 'services/cacheService'
import JwtService from 'services/jwtService'

class WsService {
  public async connect(username: string, password: string): Promise<any> {

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

}

export default new WsService()