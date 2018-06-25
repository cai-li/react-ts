export default class User {
  id?:string = 'cai123ld3c7f8k2h3j23k'
  name?: string
  password?: string

  constructor(row = {}) {
    Object.assign(this, row)
  }
}