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

export const signup = async (req, res) => {
  console.log(req.body)
  UserModel.prototype.create(req.body)
  res.send(req.body)
}

export const signin = async (req, res) => {}

export const protect = async (req, res, next) => {
  next()
}
