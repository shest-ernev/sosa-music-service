import { validationResult } from 'express-validator'

import User from '../../../models/User.js'

const editData = async (req, res) => {
   try {
      const err = validationResult(req)

      if (!err.isEmpty()) {
         return res.status(400).json({
            msg: 'Не валидные давнные',
         })
      }

      const { name, login } = req.body

      if (req.user.name === name && req.user.login === login) {
         return res.status(401).json({
            msg: 'Данные совпадают с прежними',
         })
      }

      const findLogin = await User.findOne({ login: login.toLowerCase() })

      if (login !== req.user.login && !!findLogin === true) {
         return res.status(401).json({
            msg: 'Такой логин уже есть',
         })
      }

      await User.findOneAndUpdate(
         { _id: req.user._id },
         {
            name: name.trim(),
            login: login.toLowerCase().replace(/\s+/g, ' ').trim(),
         },
         { new: true }
      ).then((doc) => {
         return res.status(200).json({
            msg: 'Данные изменены',
            user: {
               name: doc.name,
               login: doc.login,
            },
         })
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default editData
