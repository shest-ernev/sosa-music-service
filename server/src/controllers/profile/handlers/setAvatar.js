import { unlink } from 'fs'

import User from '../../../models/User.js'

const setAvatar = async (req, res) => {
   try {
      if (!!req.user.avatar) {
         unlink(req.user.avatar.replace('http://localhost:8001', 'public'), (err) => {
            if (err) {
               console.log(err)
            }
         })
      }

      await User.findOneAndUpdate(
         { _id: req.user._id },
         { avatar: `http://localhost:8001/users/avatars/${req.file.filename}` },
         { new: true }
      ).then((doc) => {
         return res.status(200).json({
            msg: 'Аватар изменён',
            avatar: doc.avatar,
         })
      })
   } catch (err) {
      console.log(err)
      return res.status(500).json({
         msg: 'Ошибка сервера',
      })
   }
}

export default setAvatar
