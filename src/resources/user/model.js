export class UserModel {
  static users = []

  create(user) {
    if (!user.id) user.id = user.email
    UserModel.users.push(user)
    return user
  }

  findById(id) {
    return UserModel.users.find(user => user.id === id)
  }

  checkPassword(id, password) {} // hint: make use of bcrypt to match password i.e: bcrypt.compare

  hashPassword(password) {} // hint: make use of bcrypt to hash password i.e: bcrypt.hash
}
