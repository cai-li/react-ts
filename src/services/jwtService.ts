import CacheService from './cacheService'

class JwtService {
  private jwt: string = ''

  public async loadJwt(): Promise<string> {
    if (this.jwt !== '') return this.jwt

    return this.jwt = await CacheService.get('jwt')
  }

  public saveJwt(jwt: string) {
    this.jwt = jwt

    CacheService.set('jwt', jwt)
  }

  public clearJwt() {
    this.jwt = ''

    CacheService.delete('jwt')
  }
}

export default new JwtService()
