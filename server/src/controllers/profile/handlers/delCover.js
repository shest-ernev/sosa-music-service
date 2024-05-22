import { unlink } from 'fs'

import User from '../../../models/User.js'

const delCover = async (req, res) => {
   try {
      if (req.user.cover === '') {
         return res.status(400).json({
            msg: 'У пользователя и так нет обложки',
         })
      }

      if (!!req.user.cover) {
         unlink(req.user.cover.replace('http://localhost:8001', 'public'), (err) => {
            if (err) {
               return res.status(404).json({
                  msg: 'Файл обложки не найден',
               })
            }
         })
      }

      await User.findOneAndUpdate({ _id: req.user._id }, { cover: '' })

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

export default delCover
