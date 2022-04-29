export class UserModel {
  constructor() {
    this.users = []
  }

  create(user) {
    this.users.push(user)
  }

  findById(id) {
    return this.users.find(user => user.id === id)
  }

  checkPassword(id, password) {} // hint: make use of bcrypt to match password i.e: bcrypt.compare

  hashPassword(password) {} // hint: make use of bcrypt to hash password i.e: bcrypt.hash
}
