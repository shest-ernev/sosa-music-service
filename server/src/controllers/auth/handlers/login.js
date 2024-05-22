import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../../models/User.js'

const login = async (req, res) => {
   try {
      const err = validationResult(req)

      if (!err.isEmpty()) {
         return res.status(400).json({
            msg: 'Данные введены не валидно',
         })
      }

      const { login, password } = req.body

      const user = await User.findOne({ login: login.toLowerCase().trim() })

      if (!user) {
         return res.status(404).json({
            msg: 'Не верный логин или пароль',
         })
      }

      const validPass = await bcrypt.compare(password, user.password)

      if (!validPass) {
         return res.status(404).json({
            msg: 'Не верный логин или пароль',
         })
      }

      const token = jwt.sign(
         { _id: user._doc._id }, 
         'ryan_gosling_1337', 
         { expiresIn: '1d' }
      )

      return res.status(200).json({
         msg: 'Пользователь автризарован',
         token,
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default login
