export default class User {
  public id?: string = 'cai123ld3c7f8k2h3j23k'
  public username?: string = ''
  public password?: string = ''
  public online?: boolean = false

  constructor(row = {}) {
    Object.assign(this, row)
  }
}