import { unlink } from 'fs'

import { config } from '../../../config.js'
import User from '../../../models/User.js'

const delAvatar = async (req, res) => {
   try {
      if (req.user.avatar === '') {
         return res.status(400).json({
            msg: 'У пользователя и так нет аватара',
         })
      }

      if (!!req.user.avatar) {
         unlink(req.user.avatar.replace(config.url, 'public'), (err) => {
            if (err) {
               return res.status(404).json({
                  msg: 'Файл аватарки не найден',
               })
            }
         })
      }

      await User.findOneAndUpdate({ _id: req.user._id }, { avatar: '' })

      return res.status(200).json({
         msg: 'Аватар удалён',
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default delAvatar
