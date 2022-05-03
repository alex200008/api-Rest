import bcrypt from 'bcrypt'

export class UserModel {
  static users = []

  create(user) {
    if (!user.id) user.id = user.email
    const newUser = {
      id: user.email,
      email: user.email,
      password: this.hashPassword(user.password)
    }
    UserModel.users.push(newUser)
    return user
  }

  findById(id) {
    return UserModel.users.find(user => user.id === id)
  }

  checkPassword(id, password) {
    const user = this.findById(id)
    return bcrypt.compareSync(password, user.password)
  } // hint: make use of bcrypt to match password i.e: bcrypt.compare

  hashPassword(password) {
    return bcrypt.hashSync(password, 256)
  } // hint: make use of bcrypt to hash password i.e: bcrypt.hash
}
