import config from '../config'
import { UserModel } from '../resources/user/model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

const User = new UserModel()
export const signup = async (req, res) => {
  const user = req.body
  user.id = user.email

  if (!user.email || !user.password) {
    res
      .status(400)
      .send({ message: 'You must signup with an email and a password' })
    return
  }
  if (User.findById(user.id)) {
    res.status(400).send({ message: 'Already signup' })
    return
  }

  User.create(req.body)

  const token = newToken(user)
  res.status(201).send({ token: token })
}

export const signin = async (req, res) => {
  let user = req.body
  user.id = user.email

  if (!user.email || !user.password) {
    res
      .status(400)
      .send({ message: 'You must signin with an email and a password' })
    return
  }

  const password = user.password
  user = await User.findById(user.id)

  if (!user) {
    res.status(401).send({ message: 'You must signup' })
    return
  }

  if (!User.checkPassword(user.id, password)) {
    res.status(401).send({ message: 'Bad password' })
    return
  }

  res.status(201).send({ token: newToken(user) })
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).end()
    return
  }

  const token = req.headers.authorization.split('Bearer ')[1]
  if (!token) {
    res.status(401).end()
    return
  }

  let user = await verifyToken(token)
  user = User.findById(user.id)
  if (!user) {
    res.status(401).end()
    return
  }
  req.user = { id: user.id }

  next()
}
