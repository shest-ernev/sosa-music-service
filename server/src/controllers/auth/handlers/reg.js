import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../../models/User.js'

const reg = async (req, res) => {
   try {
      const err = validationResult(req)

      if (!err.isEmpty()) {
         return res.status(400).json({
            mag: 'Данные введены не валидно',
         })
      }

      const { name, login, password } = req.body

      if (!!(await User.findOne({ login: login.toLowerCase() }))) {
         return res.status(401).json({
            msg: 'Такой логин уже занят',
         })
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const doc = new User({
         name: name.trim(),
         login: login.toLowerCase().replace(/\s+/g, ' ').trim(),
         password: hash,
      })

      const user = await doc.save()
      const token = jwt.sign(
         { _id: user._doc._id }, 
         'ryan_gosling_1337', 
         { expiresIn: '1d' }
      )

      return res.status(200).json({
         msg: 'Пользователь зарегестрирован',
         token,
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default reg
