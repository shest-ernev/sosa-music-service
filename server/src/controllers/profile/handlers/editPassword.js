import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

import User from '../../../models/User.js'

const editPassword = async (req, res) => {
   try {
      const err = validationResult(req)

      if (!err.isEmpty()) {
         return res.status(401).json({
            msg: 'Ошибка валидации',
         })
      }

      const { password, newPassword } = req.body

      const valPass = await bcrypt.compare(password, req.user.password)

      if (!valPass) {
         return res.status(400).json({
            msg: 'Не правильный пароль',
         })
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newPassword, salt)

      await User.findOneAndUpdate({ _id: req.user._id }, { password: hash })

      return res.status(200).json({
         msg: 'Пароль изменён',
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default editPassword
