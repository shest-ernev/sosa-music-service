import { unlink } from 'fs'

import { config } from '../../../config.js'
import User from '../../../models/User.js'

const setCover = async (req, res) => {
   try {
      if (!!req.user.cover) {
         unlink(req.user.cover.replace(config.url, 'public'), (err) => {
            if (err) {
               console.log(err)
            }
         })
      }

      await User.findOneAndUpdate(
         { _id: req.user._id },
         { cover: `${config.url}/users/covers/${req.file.filename}` },
         { new: true }
      ).then((doc) => {
         return res.status(200).json({
            msg: 'Обложка изменена',
            cover: doc.cover,
         })
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default setCover
